<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/main.tsx'])

    </head>
    <body>
        <div id="portal-root" class="fixed w-full z-50"></div>
        <div id="root" class="dark:bg-dark-blue bg-white"></div>
    </body>
</html>
