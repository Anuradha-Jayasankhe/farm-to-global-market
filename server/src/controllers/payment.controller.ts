import { Request, Response } from 'express';
import logger from '../utils/logger';

// Mock payment service (In production, integrate with Stripe/PayPal)

// @desc    Create payment intent
// @route   POST /api/v1/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd', orderId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    // Mock payment intent
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      status: 'requires_payment_method',
      clientSecret: `pi_secret_${Math.random().toString(36).substr(2, 24)}`,
      orderId,
      created: new Date().toISOString()
    };

    logger.info('Payment intent created:', { paymentIntent });

    res.status(200).json({
      success: true,
      message: 'Payment intent created successfully',
      data: paymentIntent
    });
  } catch (error: any) {
    logger.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Confirm payment
// @route   POST /api/v1/payments/confirm
// @access  Private
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, paymentMethodId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID is required'
      });
    }

    // Mock payment confirmation
    const paymentResult = {
      id: paymentIntentId,
      status: 'succeeded',
      amount: req.body.amount || 0,
      currency: req.body.currency || 'usd',
      paymentMethod: paymentMethodId || 'pm_mock',
      receiptUrl: `https://pay.stripe.com/receipts/${paymentIntentId}`,
      created: new Date().toISOString()
    };

    logger.info('Payment confirmed:', { paymentResult });

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: paymentResult
    });
  } catch (error: any) {
    logger.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get payment by ID
// @route   GET /api/v1/payments/:id
// @access  Private
export const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock payment retrieval
    const payment = {
      id,
      status: 'succeeded',
      amount: 5000, // $50.00
      currency: 'usd',
      created: new Date().toISOString(),
      description: 'Order payment'
    };

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error: any) {
    logger.error('Get payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user payment history
// @route   GET /api/v1/payments/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Mock transaction history
    const transactions = [
      {
        id: 'txn_1',
        type: 'payment',
        amount: 4500,
        currency: 'usd',
        status: 'succeeded',
        description: 'Order #ORD-123456',
        created: new Date(Date.now() - 86400000 * 1).toISOString()
      },
      {
        id: 'txn_2',
        type: 'payment',
        amount: 7800,
        currency: 'usd',
        status: 'succeeded',
        description: 'Order #ORD-123455',
        created: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'txn_3',
        type: 'refund',
        amount: -2000,
        currency: 'usd',
        status: 'succeeded',
        description: 'Refund for Order #ORD-123450',
        created: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ];

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginatedTransactions,
      pagination: {
        total: transactions.length,
        page: Number(page),
        pages: Math.ceil(transactions.length / Number(limit))
      }
    });
  } catch (error: any) {
    logger.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Process refund
// @route   POST /api/v1/payments/refund
// @access  Private (Admin/Seller)
export const processRefund = async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, amount, reason } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID is required'
      });
    }

    // Mock refund
    const refund = {
      id: `re_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      paymentIntent: paymentIntentId,
      amount: amount || 0,
      currency: 'usd',
      status: 'succeeded',
      reason: reason || 'requested_by_customer',
      created: new Date().toISOString()
    };

    logger.info('Refund processed:', { refund });

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: refund
    });
  } catch (error: any) {
    logger.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Webhook handler for payment events
// @route   POST /api/v1/payments/webhook
// @access  Public (called by payment provider)
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    logger.info('Payment webhook received:', { event });

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Update order status
        logger.info('Payment succeeded:', event.data);
        break;
      
      case 'payment_intent.payment_failed':
        // Handle failed payment
        logger.error('Payment failed:', event.data);
        break;

      case 'charge.refunded':
        // Handle refund
        logger.info('Payment refunded:', event.data);
        break;

      default:
        logger.info('Unhandled event type:', event.type);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    logger.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook error',
      error: error.message
    });
  }
};

// @desc    Get payment methods for user
// @route   GET /api/v1/payments/methods
// @access  Private
export const getPaymentMethods = async (req: Request, res: Response) => {
  try {
    // Mock saved payment methods
    const paymentMethods = [
      {
        id: 'pm_1',
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2025
        },
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'card',
        card: {
          brand: 'mastercard',
          last4: '5555',
          expMonth: 10,
          expYear: 2024
        },
        isDefault: false
      }
    ];

    res.status(200).json({
      success: true,
      data: paymentMethods
    });
  } catch (error: any) {
    logger.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add payment method
// @route   POST /api/v1/payments/methods
// @access  Private
export const addPaymentMethod = async (req: Request, res: Response) => {
  try {
    const { paymentMethodId } = req.body;

    if (!paymentMethodId) {
      return res.status(400).json({
        success: false,
        message: 'Payment method ID is required'
      });
    }

    // Mock adding payment method
    const paymentMethod = {
      id: paymentMethodId,
      type: 'card',
      card: {
        brand: 'visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2025
      },
      created: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Payment method added successfully',
      data: paymentMethod
    });
  } catch (error: any) {
    logger.error('Add payment method error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/v1/payments/methods/:id
// @access  Private
export const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    logger.info('Payment method deleted:', { id });

    res.status(200).json({
      success: true,
      message: 'Payment method deleted successfully'
    });
  } catch (error: any) {
    logger.error('Delete payment method error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
