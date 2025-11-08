<template>
  <div>
    <HeroSection /> 

    <FeaturesSection />

    <HowItWorksSection />

    <AppFooter />
  </div>
</template>

<script setup>
// Pastikan semua path mengarah ke folder yang benar (sections/layouts)
import HeroSection from '@/components/sections/HeroSection.vue'; 
import FeaturesSection from '@/components/sections/FeaturesSection.vue';
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue';
import AppFooter from '@/components/layouts/AppFooter.vue'; 
</script>