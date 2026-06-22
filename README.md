# House of Edtech

House of Edtech is a full-stack Next.js 16 application designed for educators to build structured learning paths. This project goes beyond basic CRUD operations by offering hierarchical data management (Paths > Modules > Resources) tailored for the EdTech sector.

## Features
- **Learning Paths**: Create, Read, Update, and Delete structured courses.
- **Modules & Resources**: Organize content into logical steps with rich media attachments.
- **Premium UI**: Designed with Tailwind CSS, shadcn/ui, and lucide-react for an accessible, modern, and beautiful user experience.

## Real-World Considerations

### 1. Security & Data Validation
- **Zod Validation**: Server Actions use `zod` schemas to strictly validate and sanitize all incoming form data before it touches the database. This prevents injection attacks and ensures data integrity.
- **Mongoose Schemas**: MongoDB models enforce type safety and required fields at the database level.
- **Server-Side Mutations**: By using React Server Actions, database credentials and sensitive operations never leak to the client bundle.

### 2. Error Handling
- **Graceful Failures**: Server Actions return typed error objects (`{ success: false, error: string }`) instead of throwing unhandled exceptions.
- **Database Resilience**: The MongoDB connection utility caches the connection across hot-reloads and API calls to prevent connection pooling limits from being exceeded, which is critical for Serverless environments like Vercel.

### 3. Scalability
- **Next.js App Router**: Leverages React Server Components to reduce client-side JavaScript, leading to faster load times.
- **Caching & Revalidation**: Uses `revalidatePath` to efficiently update the UI and Next.js cache only when mutations occur, reducing unnecessary database queries on read-heavy operations.
- **Document Database**: MongoDB's flexible schema allows for rapid iteration and scales well horizontally as the number of learning paths and resources grows.

### 4. Accessibility & UI/UX
- **Semantic HTML**: Proper heading structures (`h1`, `h2`, `main`, `nav`) are used throughout.
- **Shadcn/UI**: Components are built on top of Radix UI primitives, ensuring keyboard navigation, ARIA attributes, and focus management are handled correctly out of the box.
- **Responsive Design**: The Tailwind CSS implementation is fully responsive, catering to mobile, tablet, and desktop users alike.

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI="your_mongodb_connection_string"
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Developer Info
- **Developed by**: Keshav Kumar
- **GitHub**: [keshavcodex](https://github.com/keshavcodex)
- **LinkedIn**: [Keshav Kumar](https://www.linkedin.com/in/keshavcodex/)
