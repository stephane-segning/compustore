# SSDLC Discussions

## Project Overview: Compustore

**Project Summary**  
Compustore is a web-based application designed to serve as an online computer store with core e-commerce functionalities. Key features include product listings, order management, secure payment processing, and an admin interface for managing inventory and sales. Built with Next.js, the application will leverage modern technologies like Stripe for payment integration, NextAuth.js for user authentication, and React Admin for efficient administration. The project aims to provide a smooth user experience while adhering to best practices in secure software development. 

To ensure high-quality development, Compustore will follow a secure software development lifecycle (SSDLC) with steps designed to minimize vulnerabilities from planning through deployment. Adopting Scrum practices, the project will run in iterative sprints, incorporating regular demos and feedback sessions to maintain alignment with business needs. Task management will be organized on a Kanban board, emphasizing collaborative progress tracking.

**Key Project Objectives**
- Develop a user-friendly, secure web application for selling computer products.
- Implement modular, reusable code components to support efficient scaling and future enhancements.
- Ensure cost-effective deployment and operational processes.

---

## A. Requirements

### Functional Requirements

#### 1. Store
   - **Product Listings**: Enable users to view product listings categorized by various computer hardware and accessory types. Each listing should display essential product details such as name, description, price, specifications, and stock availability.
   - **Order Management**: Implement functionality for users to add products to a cart, review orders, and complete checkout. The order management system should maintain accurate records of each order, tracking its status (e.g., pending, shipped, delivered).
   - **Checkout Functionality**: Ensure a secure, smooth checkout process that allows users to review their cart and make payments using integrated Stripe functionality.
   - **Invoice Management**: Link Stripe invoices and billing systems to each order, allowing users to access transaction records and invoices through their accounts.

#### 2. Payments
   - **One-Time and Subscription Payments**: Use Stripe to support secure one-time payments for single product purchases and recurring payments for subscription services.
   - **Invoice Generation and Management**: Ensure that each transaction generates an invoice stored in both the user’s account and the admin interface for tracking and management.
   - **Payment Notifications**: Configure notifications to confirm successful payments and alert users in case of payment issues.

#### 3. User Authentication
   - **Login and Authentication**: Utilize NextAuth.js to enable secure user login, registration, and authentication, with session handling managed by Next.js to maintain logged-in status.
   - **Session Management**: Integrate `useSession` from NextAuth.js to track user sessions seamlessly across all devices, ensuring a secure and consistent user experience.
   - **User Roles**: Define roles for users, such as Customer, Admin, and Guest, with varying levels of access to functionality, particularly in the admin panel.

#### 4. Admin Panel
   - **CRUD Operations**: Build an admin panel using React Admin, allowing for efficient creation, reading, updating, and deletion (CRUD) of products, orders, and invoices.
   - **Product and Order Management**: Create custom pages within the admin panel for handling product inventory, including the ability to add, edit, and delete products. Implement order management features for tracking order statuses, updating orders, and managing customer queries.
   - **Secure Access and Authentication**: Configure the admin panel to restrict access to authorized personnel only, leveraging NextAuth.js to verify admin roles before allowing access to any sensitive operations.

---

## B. Threat Modeling

**Overview**  
Threat modeling for Compustore will identify potential security risks across three user roles (anonymous, user, admin) and within key functionalities such as product management, order processing, and payment handling. The model will use the STRIDE framework to classify threats and evaluate them from both the frontend and backend perspectives. Given that the application will deploy on Vercel and use Neon.tech for production databases, considerations around cloud security, API access, and data protection are essential.

### User Roles and Threats

#### 1. **Anonymous User (Unauthenticated Access)**
   - **Role Description**: This role represents all users who have not logged into the application. Anonymous users should be able to browse products and view individual product details but will not have access to sensitive data or any order history.
   - **Potential Threats**:
     - **Spoofing and Information Disclosure**: Unauthorized access attempts to impersonate a logged-in user, potentially via forged cookies or manipulated session tokens.
     - **Tampering**: Attempts to modify publicly accessible endpoints to retrieve restricted data (e.g., viewing order history or accessing admin pages).
     - **Denial of Service (DoS)**: Flooding of public endpoints like product listings to overwhelm server capacity.
   - **Mitigations**:
     - Use secure session cookies with HttpOnly and SameSite attributes.
     - Enforce access control by validating user sessions with `useSession` in NextAuth.js to prevent unauthorized access to logged-in user data.
     - Rate-limit anonymous access to public endpoints to prevent DoS attacks.

#### 2. **User (Authenticated Customer)**
   - **Role Description**: Authenticated users can browse products, view product details, add products to a cart, and complete purchases. They can also view their own order history but not the order histories of other users.
   - **Potential Threats**:
     - **Elevation of Privileges**: Attempt to escalate privileges by tampering with session tokens or manipulating API requests to gain access to admin-level features.
     - **Information Disclosure**: Unauthorized access to other users’ order data or sensitive payment information.
     - **Repudiation**: Users may dispute transactions or claim lack of accountability for certain actions (e.g., unauthorized purchases).
   - **Mitigations**:
     - Implement role-based access controls to restrict order history views to the authenticated user’s own records only.
     - Validate all session tokens with NextAuth.js to prevent token tampering or reuse attacks.
     - Implement logging and monitoring to track user activities, which aids in auditing and repudiation handling.

#### 3. **Admin (Authorized Administrator)**
   - **Role Description**: Admins have full access to product and order management, including creating, updating, and deleting products. They can also capture orders and manage the order lifecycle.
   - **Potential Threats**:
     - **Elevation of Privileges**: Unauthorized users gaining admin privileges, possibly through unpatched security vulnerabilities or misconfigurations.
     - **Information Disclosure**: Accidental exposure of sensitive data, such as product costs, order data, or customer PII, due to admin actions.
     - **Tampering and Repudiation**: Malicious or accidental modifications of order and product records without proper accountability.
   - **Mitigations**:
     - Require Multi-Factor Authentication (MFA) for admin users to prevent unauthorized access.
     - Enforce strict logging of admin actions for accountability and auditing.
     - Implement role-based access restrictions, ensuring CRUD operations are only accessible to authenticated admin roles.
     - Review and apply the principle of least privilege, ensuring admin accounts are created only as necessary and periodically reviewed.

### Component-Based Threats

#### 1. **Product and Order Management**
   - **Threats**:
     - **Tampering**: Unauthorized changes to product data or order statuses via unsecured endpoints.
     - **Information Disclosure**: Exposing product or order data inadvertently through poorly secured API endpoints.
   - **Mitigations**:
     - Secure CRUD endpoints with role-based access control, allowing only authenticated admin users to perform modifications.
     - Sanitize and validate all data inputs and outputs to prevent injection attacks.

#### 2. **Payment Processing and Stripe Integration**
   - **Threats**:
     - **Spoofing**: Attempting to impersonate payment requests or responses between the application and Stripe.
     - **Tampering**: Modifying payment data in transit to exploit the system, such as changing payment amounts or intercepting invoice data.
     - **Information Disclosure**: Exposure of sensitive payment data or customer billing information.
   - **Mitigations**:
     - Use HTTPS for all transactions and secure webhooks to prevent data tampering and man-in-the-middle attacks.
     - Only store minimal payment details and rely on Stripe to manage sensitive payment information directly.
     - Implement webhook verification with Stripe to ensure authenticity of incoming payment notifications.

#### 3. **Authentication and Session Management**
   - **Threats**:
     - **Session Hijacking**: Stealing or forging session cookies to gain unauthorized access to accounts.
     - **Cross-Site Request Forgery (CSRF)**: Exploiting the user's logged-in state to perform unauthorized actions on their behalf.
     - **Repudiation**: Users potentially denying specific actions or purchases made within their session.
   - **Mitigations**:
     - Use secure session cookies with HttpOnly and SameSite attributes to prevent session hijacking.
     - Implement CSRF protection, especially on sensitive actions like account updates and order placements.
     - Log all significant user actions to provide an audit trail for tracking user activity and mitigating repudiation.

#### 4. **Deployment and Data Storage (Vercel and Neon.tech)**
   - **Threats**:
     - **Denial of Service (DoS)**: Overloading the production server or database, leading to downtime or performance issues.
     - **Data Breaches**: Unauthorized access to the database, potentially exposing user data and order information.
   - **Mitigations**:
     - Use Vercel’s security features and Neon.tech’s built-in security configurations, including access control and network restrictions, to protect against unauthorized access.
     - Enable automated backups in Neon.tech and implement secure database credentials management via Vercel’s environment variables.
     - Monitor server and database access logs and set up alerts for unusual access patterns or potential DoS attacks.

---

## C. Architecture & Tech Stack

### Application Architecture

The Compustore application will be built on a **microservices-inspired** architecture using Next.js as the main framework, with separation between frontend and backend services. We’ll implement a modular structure where each component is decoupled, making the system flexible, scalable, and adaptable to future integrations. The architecture is designed for rapid development while maintaining a high degree of security and maintainability through static code analysis (SCA) and comprehensive test coverage.

### Deployment and Hosting
- **Frontend and Backend Deployment**: Vercel will host the Next.js application, which handles both frontend and backend API routes. The app will leverage Vercel’s edge functions for faster performance and secure, scalable deployment.
- **Database**: Neon.tech will provide the PostgreSQL database in production, optimized for scalability and low latency. Prisma ORM will be used for seamless communication between the application backend and Neon.tech, simplifying database operations with TypeScript type safety.

### Key Technologies and Tools

#### 1. **Core Framework and Libraries**
   - **Next.js**: The primary framework for frontend and backend development, leveraging both the `src` and `app` directories. Next.js will handle server-side rendering (SSR) and static site generation (SSG) to optimize load times and SEO.
     - **Next.js Plugins**:
       - **PWA**: Enable Progressive Web App (PWA) capabilities for offline support and installation on mobile devices.
       - **SEO**: Leverage Next.js SEO plugins to optimize pages with meta tags, structured data, and social sharing configurations.
       - **NextAuth.js**: Manage authentication via OAuth for Google, Facebook, and GitHub, focusing on security and ease of use. No username/password authentication will be implemented to reduce risk and simplify maintenance.
       - **i18next**: Implement internationalization to support multi-language experiences, making the application accessible to a broader audience.
       - **Next-Redux-Wrapper**: For seamless integration of Redux with Next.js, ensuring that state is managed consistently across SSR/SSG pages.
       - **TRPC (Type-safe Remote Procedure Calls)**: Facilitate type-safe communication between the frontend and backend, allowing us to leverage TypeScript for shared types and safer API calls.
       - **Prisma**: ORM to manage database communication with Neon.tech. Prisma enables efficient database querying, type-safe operations, and migration management in TypeScript.

#### 2. **State Management and Data Fetching**
   - **Redux and Redux Toolkit**: Core state management, utilizing the `redux-toolkit` for building and managing the application state. The toolkit offers a streamlined setup for reducers and middleware, with built-in dev tools and support for enhanced state immutability.
   - **RTK Query + TRPC**: Combined with Redux Toolkit and TRPC, RTK Query will enable caching and data synchronization with backend APIs, offering enhanced control over data fetching and mutation while minimizing boilerplate code.
   - **Logging**: Integrate logging middleware (e.g., Redux Logger or custom middleware) for debugging and error tracking during development. Error logging in production will be managed by a logging service such as Sentry.

#### 3. **Authentication**
   - **NextAuth.js**: Third-party authentication integration with providers like Google, Facebook, and GitHub using OAuth, configured to prevent vulnerabilities like session hijacking and token tampering. Session management will be handled with `useSession`, providing secure, encrypted tokens for client-server communication.

#### 4. **Payment Integration Interface**
   - **Abstract Payment Interface**: Create an interface for payment integration with modular functions that allow switching payment providers with minimal changes. 
   - **Common Payment Functions**:
     - `initPayment`: Initialize the chosen third-party payment provider (e.g., Stripe) to set up the payment session.
     - `editPaymentData`: Update payment details in the third-party provider (e.g., modifying Stripe payment intent).
     - `getPaymentStatus`: Fetch the status of a transaction (e.g., Stripe payment intent status).
     - `cancelPayment`: Optionally, support canceling the payment if the user abandons the transaction.
   - **Stripe Implementation**: Initially, implement this interface with Stripe as the payment provider, allowing easy swapping for future providers.

#### 5. **Static Code Analysis (SCA) and Code Quality**
   - **Husky**: Set up pre-commit hooks using Husky to enforce code quality checks, including:
     - **ESLint**: Linting for consistent code styling and potential error prevention.
     - **Prettier**: Code formatting for a clean and consistent style.
     - **TypeScript**: All code will use TypeScript (no `.js` files), enforcing strict type-checking to catch potential errors and improve code quality.
   - **SonarLint**: Code analysis to identify potential security vulnerabilities and code smells. SonarLint will integrate directly with the development environment for real-time feedback.
   - **Dependabot**: Regular dependency scanning and updates to ensure third-party packages are up-to-date, minimizing the risk of security vulnerabilities in dependencies.

#### 6. **UI/UX Development**
   - **TailwindCSS**: A utility-first CSS framework for building responsive, modern UIs quickly.
   - **Flowbite**: Provides a library of UI components compatible with TailwindCSS, accelerating the development of consistent and visually appealing elements.
   - **Storybook**: Component-driven UI development tool, allowing us to document and test components in isolation. Storybook also improves UI consistency and speeds up testing and bug-fixing.

#### 7. **Testing and Performance**
   - **Playwright**: For end-to-end testing to verify that all user journeys and flows function as expected across different browsers.
   - **Artillery**: Load and performance testing to identify bottlenecks, helping ensure the app performs well under high-traffic conditions.

#### 8. **Package Management and CI/CD**
   - **Yarn**: Preferred package manager for faster and more consistent dependency management.
   - **GitHub Actions (CI/CD Pipeline)**: Automated CI/CD pipeline configured to:
     - Run tests and static code analysis on each pull request.
     - Deploy automatically to Vercel’s preview environment for staging and testing.
     - Perform vulnerability checks on dependencies.
   - **Dependabot**: Integrated into the CI/CD pipeline to monitor dependencies for vulnerabilities and initiate pull requests for updates.

#### 9. **Development Environment Configuration**
   - **Pre-configured VSCode and IntelliJ**: Project-level settings to streamline developer environments, with recommended extensions and settings files for ESLint, Prettier, and TypeScript.
   - **Environment Variables**: Use Vercel’s environment management for sensitive data like API keys, Stripe keys, and database credentials, ensuring that secrets are not exposed in the codebase.
