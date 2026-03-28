import express from "express";
import { ContactMessage } from "@repo/db";

const contactRouter = express.Router();

/**
 * POST /contact
 * Submit a contact form message
 */
contactRouter.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Create contact message in database
    const contactMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      message,
      status: "new",
      createdAt: new Date(),
    });

    // TODO: Send email notification to admin
    // await sendEmailNotification({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    //   body: message,
    // });

    res.status(201).json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
      id: contactMessage._id,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /contact (Admin only - for viewing contact messages)
 */
contactRouter.get("/", async (req, res, next) => {
  try {
    // TODO: Add admin authentication middleware
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /contact/:id (Admin only - update message status)
 */
contactRouter.patch("/:id", async (req, res, next) => {
  try {
    // TODO: Add admin authentication middleware
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["new", "read", "replied", "archived"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    next(error);
  }
});

export { contactRouter };
