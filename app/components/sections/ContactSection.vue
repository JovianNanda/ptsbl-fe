<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-primary uppercase tracking-wide text-sm font-medium">
          {{ allContact?.data?.badge }}
        </p>
        <h2 class="text-5xl font-light text-gray-900 mt-2">
          {{ allContact?.data?.title }}
        </h2>
        <p class="text-gray-500 mt-2">{{ allContact?.data?.subtitle }}</p>
      </div>

      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <!-- Left Info -->
        <div class="space-y-6 flex-1 flex flex-col gap-auto w-full">
          <UCard
            v-for="value in contacts ?? []"
            :key="value?.id"
            class="flex flex-row items-start gap-4 bg-green-50 border-none shadow-none ring-0 flex-1"
            :ui="{ body: 'flex flex-row gap-4' }"
            :class="value?.position % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'"
          >
            <div
              class="flex w-fit items-center justify-center p-4 rounded-xl"
              :class="
                value?.position % 2 === 0
                  ? 'bg-gradient-to-tr to-[#6CAC3A] from-[#00A63E]'
                  : 'bg-gradient-to-tr  to-[#3B82F6] from-[#155DFC]'
              "
            >
              <IconCustom :tags="value?.icon" class="w-8 h-8 text-white" />
            </div>
            <div class="flex-col">
              <h4 class="font-medium text-gray-800">{{ value?.title }}</h4>
              <a
                href="mailto:info@saranabumilestari.co.id"
                class="hover:underline block"
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

        <!-- Right Form -->
        <UCard class="bg-blue-50 border-none shadow-none p-8 ring-0">
          <UForm class="space-y-4" @submit.prevent="handleSubmit">
            <UFormField label="Nama Lengkap" required class="w-full">
              <UInput
                v-model="name"
                placeholder="Nama Anda"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Email" required class="w-full">
              <UInput
                v-model="email"
                type="email"
                placeholder="email@contoh.com"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Nomor Telepon" required class="w-full">
              <UInput
                v-model="phone"
                placeholder="+62 ..."
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Pesan" required class="w-full">
              <UTextarea
                v-model="message"
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
              @click="showToast"
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

const contactStore = useContactStore();
await contactStore.fetchContact();
const allContact = computed(() => contactStore?.data);
const contacts = computed(() => {
  const list = allContact.value?.data.cardList;
  return Array.isArray(list)
    ? [...list].sort((a, b) => a.position - b.position)
    : [];
});

const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");

const handleSubmit = async () => {
  await contactStore.submitContactForm({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    message: message.value.trim(),
  });

  name.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
};
</script>
