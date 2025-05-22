<script setup lang="ts"></script>
<template>
  <div
    class="flex justify-between items-center w-full font-mono bg-gray-900 p-2 text-white"
  >
    <div>ai-tournament</div>
    <div class="space-x-10">
      <button>leaderboard</button>
      <button @click="navigateTo('/dashboard')">dashboard</button>
      <button @click="navigateTo('/play')">play</button>
      <button>log</button>
    </div>
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
