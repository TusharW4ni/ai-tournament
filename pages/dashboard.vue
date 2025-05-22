<script setup lang="ts">
import { ref, onMounted } from "vue";
import { format } from "date-fns";

interface Availability {
  [date: string]: {
    [hour: number]: boolean;
  };
}

const availability = ref<Availability>({});
const days = ref<Date[]>([]);
const hours = Array.from({ length: 24 }, (_, i) => i);

onMounted(() => {
  generateDaysUntilMay();
  initializeAvailability();
});

const generateDaysUntilMay = () => {
  const endDate = new Date("2025-05-12T23:59:59");
  let currentDate = new Date();

  while (currentDate <= endDate) {
    days.value.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
};

const initializeAvailability = () => {
  days.value.forEach((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    availability.value[formattedDate] = {};
    hours.forEach((hour) => {
      availability.value[formattedDate][hour] = false; // Initially set all hours to unavailable
    });
  });
};

const toggleHour = (date: Date, hour: number) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  if (
    availability.value[formattedDate] &&
    availability.value[formattedDate][hour] !== undefined
  ) {
    availability.value[formattedDate][hour] =
      !availability.value[formattedDate][hour];
  }
};

const isHourAvailable = (date: Date, hour: number): boolean => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return availability.value[formattedDate]?.[hour] || false;
};

const saveAvailability = () => {
  // In a real application, you would send this data to your backend
  console.log("Availability data:", availability.value);
  alert("Availability saved (check console)!");
};
</script>

<template>
  <Navbar />
  <div class="text-white">
    <h2 class="text-xl font-semibold mb-4">
      Set Your Availability (Until May 12, 2025)
    </h2>

    <div
      v-for="day in days"
      :key="format(day, 'yyyy-MM-dd')"
      class="mb-6 p-4 rounded-md bg-gray-800"
    >
      <h3 class="text-lg font-semibold mb-2">
        {{ format(day, "EEEE, MMMM d") }}
      </h3>
      <div
        class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2"
      >
        <div v-for="hour in hours" :key="hour" class="flex items-center">
          <input
            type="checkbox"
            :id="`hour-${format(day, 'yyyy-MM-dd')}-${hour}`"
            :value="hour"
            :checked="isHourAvailable(day, hour)"
            @change="toggleHour(day, hour)"
            class="rounded border-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <label
            :for="`hour-${format(day, 'yyyy-MM-dd')}-${hour}`"
            class="ml-2 text-sm"
          >
            {{ hour < 10 ? "0" + hour : hour }}:00
          </label>
        </div>
      </div>
    </div>

    <button
      @click="saveAvailability"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Save Availability
    </button>
  </div>
</template>
