<template>
  <section class="py-20 bg-gradient-to-b from-white to-[#F3FAF5]">
    <div class="container mx-auto text-center">
      <!-- Subtitle -->
      <p class="text-primary font-light uppercase tracking-wide mb-2">
        {{ allWorkflow?.data?.badge }}
      </p>

      <!-- Title -->
      <h2 class="text-3xl md:text-4xl font-normal text-black mb-12">
        {{ allWorkflow?.data?.title }}
      </h2>

      <!-- vertical -->
      <div class="relative flex md:hidden flex-col justify-center items-center">
        <div class="relative flex flex-col items-center w-full max-w-3xl">
          <!-- vertical line -->
          <div
            class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 h-[80%] w-[2px] bg-gray-300 z-0"
          />

          <!-- items -->

          <div
            v-for="(item, index) in allWorkflow?.data?.list ?? [null]"
            :key="index"
            class="flex flex-col md:flex-row group items-center text-center relative mb-10"
          >
            <div
              v-if="item"
              class="w-16 h-16 flex hover:scale-110 transition items-center justify-center rounded-full text-white bg-primary z-10"
            >
              <IconCustom
                :tags="item?.icon"
                style="width: 28px; height: 28px"
              />
            </div>

            <div
              v-if="index !== allWorkflow?.data?.list?.length - 1"
              class="absolute top-[100%] left-1/2 transform -translate-x-1/2 w-[2px] h-10 bg-gray-300"
            ></div>

            <div class="mt-4 bg-white px-4 py-2 rounded-lg shadow-md">
              <h3 class="font-semibold text-black text-sm">
                {{ index + 1 + `. ` + item?.title }}
              </h3>
              <p class="text-gray-500 text-sm mt-2 max-w-[200px] mx-auto">
                {{ item?.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- horizontal -->
      <div class="relative hidden md:flex justify-center items-center">
        <div class="relative flex justify-center items-center w-full max-w-6xl">
          <div
            class="absolute top-[25%] left-0 right-0 h-[2px] bg-gray-300 z-0 w-[80%] mx-auto"
          />
          <div class="flex justify-between w-full">
            <div
              v-for="(item, index) in allWorkflow?.data?.list ?? []"
              :key="index ?? 0"
              class="flex flex-col group items-center text-center w-1/5 relative"
            >
              <div
                v-if="item"
                class="w-20 h-20 flex hover:scale-110 hover:filter-[brightness(1.2)] transition items-center justify-center rounded-full text-white bg-primary z-10"
              >
                <IconCustom
                  :tags="item?.icon"
                  style="width: 32px; height: 32px"
                />
              </div>
              <h3 class="font-normal text-sm text-black mt-4">
                {{ index ?? 0 + 1 + `. ` + item?.title }}
              </h3>
              <p class="text-gray-500 text-sm mt-4 max-w-[150px]">
                {{ item?.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row gap-8 bg-linear-to-tr to-[#F0FDF41] from-[#6cac3a4d] p-5 md: rounded-2xl mt-16 px-16 py-10 md:p-10 w-fit mx-auto"
      >
        <div
          v-for="list in allWorkflow?.data?.sublist ?? []"
          :key="list?.id"
          class="flex gap-2"
        >
          <div class="flex justify-center">
            <Icon class="text-primary text-2xl" name="uil:check-circle" />
          </div>
          <div class="flex flex-col text-start">
            <h4 class="font-light text-black -mt-1">{{ list?.title }}</h4>
            <p class="text-gray-500 text-sm">
              {{ list?.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWorkflowStore } from "~/stores/workflow";

const workflowStore = useWorkflowStore();
await workflowStore.fetchWorkflow();
const allWorkflow = computed(() => workflowStore?.data);
</script>
