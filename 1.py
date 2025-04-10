import pandas as pd
import sqlite3
import socket
import getpass

# Extract
customers_df = pd.read_csv('customer.csv')
orders_df = pd.read_csv('orders.csv')

# Your name (print your name)
your_name = "Your Name"  # Replace with your actual name
print(f"Your Name: {your_name}")

# Transform
merged_df = pd.merge(orders_df, customers_df, on='CustomerID', how='inner')
merged_df['TotalAmount'] = merged_df['Quantity'] * merged_df['Price']
merged_df['Status'] = merged_df['OrderDate'].apply(lambda d: 'New' if d >= '2024-10-01' else 'Old')
high_value_orders = merged_df[merged_df['TotalAmount'] > 4500]

# Load
conn = sqlite3.connect('ecommerce.db')
high_value_orders.to_sql('HighValueOrders', conn, if_exists='replace', index=False)

# Display results
result = conn.execute('SELECT * FROM HighValueOrders')
for row in result.fetchall():
    print(row)

conn.close()

# Print machine details
print(f"Machine Name: {socket.gethostname()}")
print(f"User: {getpass.getuser()}")
print("ETL process completed successfully!")