<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">{{ $t('home.title') }}</h1>
      <p class="text-muted-foreground">{{ $t('home.subtitle') }}</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="group relative overflow-hidden rounded-lg border bg-card p-6 hover:border-primary"
      >
        <div class="flex items-center gap-4">
          <component :is="tool.icon" class="h-8 w-8 text-primary" />
          <div class="space-y-1">
            <h3 class="font-semibold">{{ $t(tool.nameKey) }}</h3>
            <p class="text-sm text-muted-foreground">{{ $t(tool.descriptionKey) }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">{{ $t('home.features.title') }}</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.titleKey"
          class="space-y-2 rounded-lg border bg-card p-4"
        >
          <component :is="feature.icon" class="h-6 w-6 text-primary" />
          <h3 class="font-semibold">{{ $t(feature.titleKey) }}</h3>
          <p class="text-sm text-muted-foreground">{{ $t(feature.descriptionKey) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TerminalIcon, KeyIcon, IdentificationIcon, CalculatorIcon, SwitchVerticalIcon } from '@heroicons/vue/outline'
import { CloudIcon, LightningBoltIcon, DeviceMobileIcon } from '@heroicons/vue/outline'

const tools = [
  {
    path: '/regex',
    nameKey: 'home.tools.regex.name',
    descriptionKey: 'home.tools.regex.description',
    icon: TerminalIcon
  },
  {
    path: '/crypto',
    nameKey: 'home.tools.crypto.name',
    descriptionKey: 'home.tools.crypto.description',
    icon: KeyIcon
  },
  {
    path: '/uuid',
    nameKey: 'home.tools.uuid.name',
    descriptionKey: 'home.tools.uuid.description',
    icon: IdentificationIcon
  },
  {
    path: '/word-count',
    nameKey: 'home.tools.wordCount.name',
    descriptionKey: 'home.tools.wordCount.description',
    icon: CalculatorIcon
  },
  {
    path: '/case-convert',
    nameKey: 'home.tools.caseConvert.name',
    descriptionKey: 'home.tools.caseConvert.description',
    icon: SwitchVerticalIcon
  }
]

const features = [
  {
    titleKey: 'home.features.frontend.title',
    descriptionKey: 'home.features.frontend.description',
    icon: CloudIcon
  },
  {
    titleKey: 'home.features.fast.title',
    descriptionKey: 'home.features.fast.description',
    icon: LightningBoltIcon
  },
  {
    titleKey: 'home.features.responsive.title',
    descriptionKey: 'home.features.responsive.description',
    icon: DeviceMobileIcon
  }
]
</script>