<template>
  <UContainer class="py-16 flex justify-center">
    <UCard
      :ui="{
        body: 'text-center bg-white ring-0 border-0 outline-0',
      }"
      class="max-w-3xl w-full ring-0 border-0 outline-0 rounded-3xl shadow-xl p-10 bg-white"
    >
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Butuh Konsultasi untuk Kebutuhan Anda?
      </h2>
      <p class="text-gray-500 mb-8">
        Tim ahli kami siap membantu Anda menemukan solusi terbaik untuk
        pengelolaan limbah B3 perusahaan Anda
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <!-- Call Button -->
        <UButton
          icon="i-heroicons-phone"
          size="lg"
          color="secondary"
          class="rounded-full shadow-md px-6 text-white cursor-pointer"
        >
          Hubungi: +62 21 1234 5678
        </UButton>

        <!-- Email Button -->
        <UButton
          icon="i-heroicons-envelope"
          size="lg"
          class="rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white px-6 cursor-pointer"
        >
          Email Kami
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>
