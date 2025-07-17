<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <div>
      <UploadFiles />
    </div>
    <NuxtErrorBoundary>
      <template #error="{ error, clearError }">
        <div> Error info: {{ error }}</div> | <div @click="clearError()">Clear Error</div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>
