<template>
  <header class="bg-blue-400 text-white py-8 px-5 shadow-lg">
    <RouterLink :to="{ name: 'cryptos' }" class="font-bold text-3xl md:text-4xl">
      CryptoShire
    </RouterLink>
  </header>

  <main class="mt-10 px-5 container mx-auto">
    <RouterView />
  </main>

  <footer class="text-gray-700 text-center mt-10">
    &copy;All rights reserved - CryptoShire - {{ new Date().getFullYear() }}
  </footer>
</template>
