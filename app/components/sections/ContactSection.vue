<template>
  <section v-if="contactData" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-primary uppercase tracking-wide text-sm font-medium">
          {{ contactData.badge }}
        </p>
        <h2 class="text-5xl font-light text-gray-900 mt-2">
          {{ contactData.title }}
        </h2>
        <p class="text-gray-500 mt-2">{{ contactData.subtitle }}</p>
      </div>

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div class="space-y-6 flex-1 flex flex-col gap-auto w-full">
          <UCard
            v-for="value in sortedContacts"
            :key="value.id"
            class="flex flex-row items-start gap-4 border-none shadow-none ring-0 flex-1 py-4"
            :ui="{ body: 'flex flex-row gap-4' }"
            :class="value.position % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'"
          >
            <div
              class="flex items-center justify-center p-4 rounded-xl"
              :class="
                value.position % 2 === 0
                  ? 'bg-gradient-to-tr to-[#6CAC3A] from-[#00A63E]'
                  : 'bg-gradient-to-tr to-[#3B82F6] from-[#155DFC]'
              "
            >
              <BackendIcon
                :icon="value?.icon"
                :class-name="'w-8 h-8 text-white'"
              />
            </div>
            <div class="flex-col">
              <h4 class="font-medium text-gray-800">{{ value?.title }}</h4>
              <a
                :href="value?.link || '#'"
                :class="
                  value.position % 2 === 0 ? 'text-green-600' : 'text-blue-600'
                "
              >
                {{ value?.subtitle }}
              </a>
              <p class="text-gray-500 text-sm">{{ value?.description }}</p>
            </div>
          </UCard>
        </div>

        <UCard class="bg-blue-50 border-none shadow-none p-8 ring-0">
          <UForm class="space-y-4" @submit="handleSubmit">
            <UFormField label="Nama Lengkap" required class="w-full">
              <UInput
                v-model="form.name"
                placeholder="Nama Anda"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Email" required class="w-full">
              <UInput
                v-model="form.email"
                type="email"
                placeholder="email@contoh.com"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Nomor Telepon" required class="w-full">
              <UInput
                v-model="form.phone"
                placeholder="+62 ..."
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Pesan" required class="w-full">
              <UTextarea
                v-model="form.message"
                :rows="4"
                class="w-full"
                placeholder="Tulis pesan Anda..."
                required
              />
            </UFormField>

            <UButton
              type="submit"
              block
              color="primary"
              class="mt-4 py-2"
              :loading="isSubmitting"
            >
              Kirim Pesan
              <UIcon name="i-heroicons-paper-airplane-20-solid" class="ml-2" />
            </UButton>
          </UForm>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContactStore } from "~/stores/contact";

// 1. Setup
const { locale } = useI18n();
const contactStore = useContactStore();
const toast = useToast(); // Requires Nuxt UI

// 2. Data Fetching (SSR & Locale Aware)
await useAsyncData("contact-data", () => contactStore.fetchContact(), {
  watch: [locale],
});

// 3. Computeds
// Access the getter (assumes getter name is contactData)
const contactData = computed(() => contactStore.contactData);

const sortedContacts = computed(() => {
  // Access the cardList safely
  const list = contactData.value?.cardList;

  if (!Array.isArray(list)) return [];

  // Create a copy to avoid mutating store state
  return [...list].sort((a, b) => a.position - b.position);
});

// 4. Form Handling
const isSubmitting = ref(false);
const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    await contactStore.submitContactForm({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    });

    // Success Feedback
    toast.add({
      title: "Success",
      description: "Pesan berhasil dikirim!",
      color: "green",
    });

    // Reset Form
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";
  } catch (error) {
    // Error Feedback
    toast.add({
      title: "Error",
      description: "Gagal mengirim pesan.",
      color: "red",
    });
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
