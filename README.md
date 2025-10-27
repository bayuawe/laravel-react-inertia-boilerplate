# Laravel Inertia React Boilerplate

This is a modern Laravel boilerplate application built with Inertia.js and React, providing a solid foundation for building full-stack web applications with a seamless SPA-like experience.

## Techstack

### Backend

-   **PHP**: ^8.2
-   **Laravel**: ^12.0 - The PHP framework for web artisans
-   **Inertia.js**: ^2.0 - Modern monolith architecture
-   **Laravel Sanctum**: ^4.0 - API authentication for SPAs
-   **Ziggy**: ^2.0 - Generate JavaScript routes from Laravel routes

### Frontend

-   **React**: ^18.2.0 - JavaScript library for building user interfaces
-   **Inertia.js React**: ^2.0.0 - React adapter for Inertia.js
-   **Tailwind CSS**: ^3.2.1 - Utility-first CSS framework
-   **Shadcn/ui**: Modern UI components built on Radix UI
-   **Vite**: ^7.0.7 - Fast build tool and dev server
-   **Radix UI**: Accessible UI primitives

### Development Tools

-   **Composer**: PHP dependency manager
-   **NPM**: JavaScript package manager
-   **Laravel Breeze**: Authentication scaffolding
-   **Laravel Sail**: Docker development environment
-   **Pest**: PHP testing framework
-   **Laravel Pail**: Artisan command runner

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   PHP ^8.2
-   Composer
-   Node.js & NPM
-   Git

## Installation

1. **Clone the repository**

    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Set up environment file**

    ```bash
    cp .env.example .env
    ```

4. **Generate application key**

    ```bash
    php artisan key:generate
    ```

5. **Set up the database**

    - Configure your database settings in `.env` file
    - Run migrations:
        ```bash
        php artisan migrate
        ```

6. **Install JavaScript dependencies**

    ```bash
    npm install
    ```

7. **Build assets**
    ```bash
    npm run build
    ```

### Quick Setup (Alternative)

You can use the provided setup script:

```bash
composer run setup
```

## Usage

### Development

To start the development server with hot reloading:

```bash
composer run dev
```

This will start:

-   Laravel server on `http://localhost:8000`
-   Queue worker
-   Vite dev server for asset compilation

### Production

1. Build assets for production:

    ```bash
    npm run build
    ```

2. Start the Laravel server:
    ```bash
    php artisan serve
    ```

### Available Commands

-   `composer run dev` - Start development servers
-   `composer run test` - Run PHP tests
-   `npm run dev` - Start Vite dev server
-   `npm run build` - Build assets for production

## Project Structure

```
├── app/                    # Laravel application code
├── resources/
│   ├── js/                 # React frontend code
│   │   ├── Components/     # Reusable React components
│   │   ├── Pages/          # Inertia.js pages
│   │   └── Layouts/        # Page layouts
│   └── css/                # Stylesheets
├── routes/                 # Laravel routes
├── database/               # Migrations, seeders, factories
├── public/                 # Public assets
├── tests/                  # Test files
└── config/                 # Configuration files
```

## Features

-   **Authentication**: Complete auth system with login, register, password reset
-   **Dashboard**: Protected dashboard area
-   **Profile Management**: User profile editing and password updates
-   **Responsive Design**: Mobile-first design with Tailwind CSS
-   **Modern UI**: Clean interface using Shadcn/ui components
-   **SPA Experience**: Fast navigation with Inertia.js
-   **API Ready**: Built-in support for API authentication with Sanctum

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## TODO / Development Roadmap

This is a boilerplate project, so users can start development immediately without initial setup. However, there are some pending tasks to enhance the boilerplate:

### Pending Tasks

-   [ ] **Database Seeding**: Create seeders for sample users and data to demonstrate the application
-   [ ] **Environment Configuration**: Add detailed .env.example with all necessary configurations
-   [ ] **Testing Setup**: Implement comprehensive tests for controllers, components, and features
-   [ ] **API Documentation**: Add API documentation for available endpoints
-   [ ] **Deployment Guide**: Create deployment instructions for production environments
-   [ ] **Code Quality**: Set up code quality tools (PHPStan, ESLint, Prettier)
-   [ ] **Performance Optimization**: Implement caching strategies and asset optimization
-   [ ] **Security Audit**: Review and implement additional security measures
-   [ ] **Accessibility**: Ensure all components meet WCAG accessibility standards
-   [ ] **Internationalization**: Add support for multiple languages (i18n)

### Completed Tasks

-   [x] Basic Laravel installation with Inertia.js and React
-   [x] Authentication system (login, register, password reset)
-   [x] Dashboard layout with sidebar navigation
-   [x] Profile management (edit profile, change password)
-   [x] Responsive design with Tailwind CSS
-   [x] Shadcn/ui component integration
-   [x] Vite build setup for fast development

## Contributing

When contributing to this boilerplate, please consider the pending tasks above. Feel free to pick up any unfinished items or suggest new features.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
