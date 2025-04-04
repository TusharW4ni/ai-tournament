<script setup lang="ts"></script>
<template>
  <div
    class="flex justify-between items-center w-screen font-mono bg-gray-900 p-2 text-white"
  >
    <div>ai-tournament</div>
    <div class="flex items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </div>
</template>
