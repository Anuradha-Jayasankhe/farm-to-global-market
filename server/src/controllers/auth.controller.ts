import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User.model';
import { logger } from '../config/logger';
import { AppError, asyncHandler } from '../middleware/errorHandler';

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, phone, role } = req.body;

  logger.info(`Registration attempt for email: ${email}`);

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    phone,
    role: role || 'farmer',
  });

  // Generate email verification token
  const verificationToken = user.getEmailVerificationToken();
  await user.save();

  logger.info(`User registered successfully: ${user.email}, ID: ${user._id}`);

  // TODO: Send verification email
  // await sendVerificationEmail(user.email, verificationToken);

  sendTokenResponse(user, 201, res, 'User registered successfully. Please check your email to verify your account.');
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  logger.info(`Login attempt for email: ${email}`);

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    logger.warn(`Failed login attempt for email: ${email}`);
    throw new AppError('Invalid credentials', 401);
  }

  // Check if account is active
  if (!user.isActive) {
    throw new AppError('Your account has been deactivated. Please contact support.', 403);
  }

  logger.info(`User logged in successfully: ${user.email}`);

  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`User logged out: ${req.user?.email}`);

  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {},
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Verify email
// @route   GET /api/v1/auth/verify-email/:token
// @access  Public
export const verifyEmail = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  logger.info(`Email verified for user: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User not found with this email', 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  // TODO: Send reset password email
  // const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  // await sendResetPasswordEmail(user.email, resetUrl);

  logger.info(`Password reset requested for: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to email',
    data: { resetToken }, // Remove in production
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    throw new AppError('Please provide a password', 400);
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token', 400);
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  logger.info(`Password reset successful for: ${user.email}`);

  sendTokenResponse(user, 200, res, 'Password reset successful');
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response,
  message: string
) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          subscription: user.subscription,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
};
