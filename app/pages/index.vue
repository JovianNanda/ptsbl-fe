<template>
  <UApp :toaster="{ position: 'bottom-right', expand: false, duration: 6000 }">
    <HomeSection id="hero" />
    <ServiceSection id="hero" />
    <AdvantageSection id="hero" />
    <FleetSection id="hero" />
    <WorkflowSection id="hero" />
    <IndustrySection id="hero" />
    <PartnerSection id="hero" />
    <LocationSection id="location" />
    <ContactSection id="contact" />
  </UApp>
</template>
<script setup>
import HomeSection from "~/components/sections/HomeSection.vue";
import ServiceSection from "~/components/sections/ServiceSection.vue";
import AdvantageSection from "~/components/sections/AdvantageSection.vue";
import FleetSection from "~/components/sections/FleetSection.vue";
import WorkflowSection from "~/components/sections/WorkflowSection.vue";
import IndustrySection from "~/components/sections/IndustrySection.vue";
import PartnerSection from "~/components/sections/PartnerSection.vue";
import LocationSection from "~/components/sections/LocationSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";
</script>
