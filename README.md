# Digital Marketplace

A modern digital marketplace platform built with Next.js, Prisma, and MySQL where sellers can create shops and list digital products.

## Features

### For Sellers
- **Create Seller Profile**: Set up a unique shop with custom URL
- **Shop Management**: Manage shop information, social links, and contact details
- **Product Listing**: Upload and manage digital products
- **Unique Shop URLs**: Each seller gets a unique web address (e.g., `/shop/my-shop-name`)

### For Buyers
- **Browse Shops**: Visit individual seller shops
- **Product Discovery**: Browse products by category
- **Shop Profiles**: View seller information and social links

### For Admins
- **Seller Approval**: Review and approve/reject seller applications
- **Product Moderation**: Review and approve/reject product listings
- **Admin Dashboard**: Manage the entire marketplace

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Authentication**: NextAuth.js
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- XAMPP (for local development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd digital-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your database configuration:
```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Create an admin user:
```bash
npx tsx scripts/create-admin.ts
```

6. Start the development server:
```bash
npm run dev
```

## Usage

### Admin Access
- **Email**: admin@example.com
- **Password**: admin123

### Creating a Seller Profile

1. Register/Login to your account
2. Navigate to `/sell`
3. Fill in your shop information:
   - Shop name (will generate unique URL)
   - Category
   - Description
   - Contact email
   - Website (optional)
   - Social media links (optional)
4. Submit the form
5. Wait for admin approval

### Adding Products

1. After your shop is approved, go to `/sell/product`
2. Fill in product details:
   - Title
   - Description
   - Category
   - Price
   - Upload product files
   - Upload thumbnail (optional)
3. Submit for admin review

### Accessing Your Shop

Once approved, your shop will be accessible at:
```
http://localhost:3000/shop/your-shop-name
```

## Database Schema

### Users
- Basic user information with authentication
- Role-based access (USER, ADMIN)

### Sellers
- Shop information and profile
- Unique shop URLs
- Status tracking (PENDING, APPROVED, REJECTED)

### Products
- Product details and pricing
- File uploads (placeholder implementation)
- Status tracking (PENDING, APPROVED, REJECTED)
- Seller relationship

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Sellers
- `POST /api/seller` - Create seller profile
- `GET /api/seller?userId=<id>` - Get seller by user ID
- `GET /api/seller?shopUrl=<url>` - Get seller by shop URL

### Products
- `POST /api/products` - Create product (with file upload)
- `GET /api/products` - List products with filters

### Admin
- `GET /api/admin/sellers` - List all sellers
- `GET /api/admin/products` - List all products
- `POST /api/admin/sellers/[id]/approve` - Approve seller
- `POST /api/admin/sellers/[id]/reject` - Reject seller
- `POST /api/admin/products/[id]/approve` - Approve product
- `POST /api/admin/products/[id]/reject` - Reject product

## File Upload

Currently, file uploads are implemented with placeholder URLs. To implement actual file storage:

1. Set up cloud storage (AWS S3, Cloudinary, etc.)
2. Update the product creation API to handle file uploads
3. Store actual file URLs in the database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 