<template>
  <footer
    class="relative text-white"
    style="
      background-image: url('/images/forest.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="bg-green-900/80">
      <div class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <img src="/images/LogoSBL.png" alt="" srcset="" />
          </div>
          <p class="text-gray-200 text-sm leading-relaxed">
            Pengelolaan limbah B3 terpercaya untuk Indonesia
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-3">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/layanan" class="hover:underline">Layanan</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tentang" class="hover:underline">Tentang</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lokasi" class="hover:underline">Lokasi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kontak" class="hover:underline">Kontak</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Kontak -->
        <div>
          <h4 class="font-semibold text-white mb-3">Kontak</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <UIcon
                name="i-heroicons-map-pin-20-solid"
                class="w-5 h-5 mt-0.5"
              />
              Jakarta Timur 13930
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-heroicons-phone-20-solid" class="w-5 h-5" />
              +62 21 1234 5678
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-heroicons-envelope-20-solid" class="w-5 h-5" />
              info@saranabumilestari.co.id
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-white/20 mx-auto max-w-6xl" />

      <div class="text-center text-sm text-gray-200 py-4">
        © 2025 PT Sarana Bumi Lestari. All rights reserved.
      </div>
    </div>
  </footer>
</template>
