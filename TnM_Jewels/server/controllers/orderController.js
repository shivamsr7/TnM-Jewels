import supabase from "../config/supabase.js";
import { sendOrderConfirmation } from "../services/emailService.js";
export const createOrder = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      state,
      pincode,
      subtotal,
      shipping_charge,
      total,
      payment_method,
      payment_status,
      order_notes,
      gift_wrap,
      coupon_code,
      payment_id,
      items,
    } = req.body;
// Check stock availability
for (const item of items) {
  const { data: product, error } = await supabase
    .from("products")
    .select("name, stock")
    .eq("id", item.product_id)
    .single();

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Product not found.",
    });
  }

  if (product.stock < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} unit(s) of ${product.name} are available.`,
    });
  }
}
    // Generate Order Number
// Today's date (YYYYMMDD)
const today = new Date();

const datePart =
  today.getFullYear().toString() +
  String(today.getMonth() + 1).padStart(2, "0") +
  String(today.getDate()).padStart(2, "0");

// Get today's latest order
const { data: latestOrder } = await supabase
  .from("orders")
  .select("order_number")
  .like("order_number", `TNM-${datePart}-%`)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

let sequence = 1;

if (latestOrder?.order_number) {
  sequence =
    parseInt(
      latestOrder.order_number.split("-")[2],
      10
    ) + 1;
}

const orderNumber = `TNM-${datePart}-${String(sequence).padStart(4, "0")}`;
    // Insert Order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        city,
        state,
        pincode,
        subtotal,
        shipping_charge,
        total,
        payment_method,
        payment_status,
        order_status: "Pending",
        order_notes,
        gift_wrap,
        coupon_code,
        payment_id,
      })
      .select()
      .single();

    if (orderError) {
      return res.status(400).json({
        success: false,
        message: orderError.message,
      });
    }

    // Prepare Order Items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      return res.status(400).json({
        success: false,
        message: itemsError.message,
      });
    }
// Reduce stock
for (const item of items) {
  const { data: product } = await supabase
    .from("products")
    .select("stock")
    .eq("id", item.product_id)
    .single();

  await supabase
    .from("products")
    .update({
      stock: product.stock - item.quantity,
    })
    .eq("id", item.product_id);
}
console.log("Calling sendOrderConfirmation...");
    console.log("Calling sendOrderConfirmation...");
await sendOrderConfirmation({
  ...order,
  items: orderItems,
});
    res.status(201).json({
      success: true,
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      orders: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    const { data: items, error: itemsError } =
      await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", id);

    if (itemsError) {
      return res.status(400).json({
        success: false,
        message: itemsError.message,
      });
    }

    res.json({
      success: true,
      order,
      items,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status } = req.body;

    const { data, error } = await supabase
      .from("orders")
      .update({
        order_status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      order: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
export const getRecentOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        total,
        order_status,
        payment_status,
        created_at
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.json({
      success: true,
      orders: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};