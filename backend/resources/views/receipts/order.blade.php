<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt - {{ $order->order_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            padding: 20px;
            max-width: 300px;
            margin: 0 auto;
        }

        .receipt {
            border: 1px dashed #ccc;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #999;
        }

        .header h1 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .header p {
            font-size: 10px;
            color: #666;
        }

        .info {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #999;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .info-label {
            color: #666;
        }

        .items {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #999;
        }

        .items-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }

        .item {
            margin-bottom: 8px;
        }

        .item-row {
            display: flex;
            justify-content: space-between;
        }

        .item-name {
            flex: 1;
        }

        .item-qty {
            width: 40px;
            text-align: center;
        }

        .item-price {
            width: 80px;
            text-align: right;
        }

        .item-notes {
            font-size: 10px;
            color: #666;
            font-style: italic;
            padding-left: 10px;
            margin-top: 2px;
        }

        .totals {
            margin-bottom: 20px;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .total-row.grand-total {
            font-size: 14px;
            font-weight: bold;
            padding-top: 10px;
            border-top: 1px solid #333;
            margin-top: 10px;
        }

        .footer {
            text-align: center;
            font-size: 10px;
            color: #666;
            padding-top: 15px;
            border-top: 1px dashed #999;
        }

        .footer p {
            margin-bottom: 5px;
        }

        .status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-closed {
            background-color: #d4edda;
            color: #155724;
        }

        .status-open {
            background-color: #fff3cd;
            color: #856404;
        }

        .status-cancelled {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>Restaurant POS</h1>
        </div>

        <div class="info">
            <div class="info-row">
                <span class="info-label">Order No:</span>
                <span>{{ $order->order_number }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Table:</span>
                <span>{{ $order->table->table_number ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Date:</span>
                <span>{{ \Carbon\Carbon::parse($order->order_date)->format('d/m/Y H:i') }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Cashier:</span>
                <span>{{ $order->user->name ?? 'N/A' }}</span>
            </div>
        </div>

        <div class="items">
            <div class="items-header">
                <span class="item-name">Item</span>
                <span class="item-qty">Qty</span>
                <span class="item-price">Subtotal</span>
            </div>

            @foreach($order->details as $detail)
                <div class="item">
                    <div class="item-row">
                        <span class="item-name">{{ $detail->menu->name ?? 'Unknown Item' }}</span>
                        <span class="item-qty">{{ $detail->quantity }}</span>
                        <span class="item-price">Rp {{ number_format($detail->subtotal, 0, ',', '.') }}</span>
                    </div>
                    <div style="font-size: 10px; color: #666; padding-left: 10px;">
                        @ Rp {{ number_format($detail->price, 0, ',', '.') }}
                    </div>
                    @if($detail->notes)
                        <div class="item-notes">Note: {{ $detail->notes }}</div>
                    @endif
                </div>
            @endforeach
        </div>

        <div class="totals">
            <div class="total-row">
                <span>Subtotal ({{ $order->details->count() }} items)</span>
                <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
            </div>
            <div class="total-row grand-total">
                <span>TOTAL</span>
                <span>Rp {{ number_format($order->total_amount, 0, ',', '.') }}</span>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your visit!</p>
            <p>Please come again</p>
            <p style="margin-top: 10px;">Printed: {{ now()->format('d/m/Y H:i:s') }}</p>
        </div>
    </div>
</body>
</html>
