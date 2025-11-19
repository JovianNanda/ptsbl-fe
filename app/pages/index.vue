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

useHead({
  title: "PT Sarana Bumi Lestari - Official Website",
  link: [
    {
      rel: "canonical",
      href: "https://saranabumilestari.com/",
    },
    { rel: "alternate", href: "https://saranabumilestari.com", hreflang: "id" },
  ],
  meta: [
    {
      name: "description",
      content:
        "PT Sarana Bumi Lestari menyediakan layanan pengangkutan, pengumpulan, dan pengelolaan Limbah B3 yang aman, berizin, dan terintegrasi di Indonesia.",
    },
    {
      name: "keywords",
      content:
        "Limbah B3, Pengangkutan Limbah B3, Pengolahan Limbah B3, Jasa Limbah B3, Pengumpulan Limbah B3, Transporter B3",
    },
    { property: "og:title", content: "PT Sarana Bumi Lestari" },
    {
      property: "og:description",
      content:
        "Layanan pengelolaan Limbah B3 yang aman, profesional, dan berizin.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://saranabumilestari.com" },
    {
      property: "og:image",
      content: "https://saranabumilestari.com/images/logoSBL_2.png",
    },

    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: "https://saranabumilestari.com/images/LogoSBL.png",
    },
  ],

  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PT Sarana Bumi Lestari",
        url: "https://saranabumilestari.com",
        logo: "https://saranabumilestari.com/images/logoSBL_2.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-811-3080-8778",
          contactType: "customer service",
        },
      }),
    },
  ],
});
</script>
