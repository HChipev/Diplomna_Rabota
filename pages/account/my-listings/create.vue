<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="p-4 border border-border-color rounded-md">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl md:text-6xl ml-5">Create a New Listing</h1>
        <div class="flex mx-5 max-w-[60px] sm:max-w-[80px] md:max-w-[120px]">
          <img
            v-if="carOnParts"
            src="~assets/car-on-parts-icon.svg"
            alt="Car on parts" />
          <img v-else src="~assets/car-icon.svg" alt="Car" />
        </div>
      </div>
      <div class="p-1 sm:pt-4 -mt-3 sm:mt-5 flex flex-col">
        <div class="rounded-lg border border-border-color pt-5 mb-5">
          <div class="flex px-2 sm:px-4 sm:mx-1">
            <input
              @change="checkboxSelected(), onChange(carOnParts, 'is_on_parts')"
              :checked="carOnParts"
              class="w-7 h-7 text-accent-color rounded-md bg-white border-accent-color checked:bg-accent-color focus:ring-accent-color focus:outline-none mt-1 mb-4"
              type="checkbox"
              aria-label="cars-on-parts" />
            <label
              @click="checkboxSelected(), onChange(carOnParts, 'is_on_parts')"
              class="ml-2 text-nowrap text-2xl"
              for="checkbox"
              >On Parts *</label
            >
          </div>
          <div class="grid sm:grid-cols-3 grid-cols-1">
            <CarAddSelect
              title="Make *"
              :options="makes"
              name="make"
              @selectChange="onChange" />
            <CarAddSelect
              title="Model *"
              :options="models"
              name="model"
              @selectChange="onChange" />
            <CarAddInput
              title="Year *"
              :type="'text'"
              placeholder="Year"
              name="year"
              @inputChange="onChange" />

            <CarAddSelect
              title="Engine *"
              :options="engines"
              name="engine"
              @selectChange="onChange" />
            <CarAddSelect
              title="Gearbox *"
              :options="gearboxes"
              name="gearbox"
              @selectChange="onChange" />

            <CarAddSelect
              title="Drivetrain *"
              :options="drivetrains"
              name="drivetrain"
              @selectChange="onChange" />

            <CarAddSelect
              title="Region *"
              :options="regions"
              name="region"
              @selectChange="onChange" />

            <CarAddSelect
              title="City *"
              :options="cities"
              name="city"
              @selectChange="onChange" />

            <CarAddSelect
              title="Color"
              :options="colors"
              name="color"
              @selectChange="onChange" />

            <CarAddInput
              v-for="input in inputs"
              :type="input.type"
              :key="input.id"
              :title="input.title"
              :name="input.name"
              :placeholder="input.placeholder"
              @inputChange="onChange" />
          </div>
        </div>
        <div class="border border-border-color rounded-lg pt-5 mb-5">
          <CarAddImage @imageChange="onChange" />

          <CarAddTextarea
            title="Description"
            name="description"
            placeholder="Describe your car in a few words..."
            @inputChange="onChange" />
        </div>
        <ReuseableButton
          :class="showFeatures ? 'active' : ''"
          class="dropdown-button mx-auto mb-5 px-8"
          @click="showFeatures = !showFeatures"
          >Show Features</ReuseableButton
        >
        <div v-if="showFeatures">
          <div
            class="border border-border-color border-b-0 rounded-t-lg flex items-center justify-center py-2 mt-1">
            <p class="flex items-center justify-center text-2xl">Extras</p>
          </div>
          <div class="flex w-full pb-2">
            <div class="flex-1 border border-border-color">
              <div class="flex flex-col">
                <p class="flex items-center justify-center text-lg pt-1 mb-3">
                  Safety
                </p>
                <SearchBigAdvancedParametersCheckbox
                  v-for="n in 12"
                  :extraName="n + 's'" />

                <p
                  class="flex items-center justify-center text-lg pt-1 mb-3 border-t border-border-color">
                  Exterior
                </p>
                <SearchBigAdvancedParametersCheckbox
                  v-for="n in 11"
                  :extraName="n + 'e'" />

                <p
                  class="flex items-center justify-center text-lg pt-1 mb-3 border-t border-border-color">
                  Other
                </p>
                <SearchBigAdvancedParametersCheckbox
                  v-for="n in 7"
                  :extraName="n + 'o'" />
              </div>
            </div>

            <div class="flex-1 border border-border-color">
              <div class="flex flex-col">
                <p class="flex items-center justify-center pt-1 mb-3">
                  Comfort
                </p>
                <SearchBigAdvancedParametersCheckbox
                  v-for="n in 26"
                  :extraName="n + 'c'" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <ReuseableButton class="primery-button px-24 sm:px-32 mx-auto mt-5">
            Submit
          </ReuseableButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  useHead({
    title: "Add Listing",
    meta: [
      {
        name: "description",
        content: "Put your car up for sale!",
      },
    ],
  });
  definePageMeta({
    middleware: ["user-protected-pages-middleware"],
  });
  const carOnParts = ref(false);
  const showFeatures = ref(false);
  const regionId = ref("1");
  const makeId = ref("1");
  function checkboxSelected() {
    carOnParts.value = !carOnParts.value;
  }
  const { data: makes } = await useFetch("/api/input/makes");
  let { data: models } = await useFetch(`/api/input/models/${makeId.value}`);
  const { data: engines } = await useFetch("/api/input/engines");
  const { data: gearboxes } = await useFetch("/api/input/gearboxes");
  const { data: drivetrains } = await useFetch("/api/input/drivetrains");
  const { data: regions } = await useFetch("/api/input/regions");
  const { data: cities } = await useFetch(
    `/api/input/cities/${regionId.value}`
  );
  const { data: colors } = await useFetch("/api/input/colors");

  const carInfo = useState("carInfo", () => {
    return {
      make: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      hp: "",
      engine: "",
      gearbox: "",
      drivetrain: "",
      region: "",
      city: "",
      features: "",
      color: "",
      description: "",
      is_on_parts: false,
      image: null,
    };
  });
  function onChange(value, name) {
    carInfo.value[name] = value;
  }
  const inputs = [
    {
      id: 1,
      title: "Mileage *",
      type: "text",
      name: "mileage",
      placeholder: "Mileage",
    },
    {
      id: 2,
      title: "Price *",
      type: "text",
      name: "price",
      placeholder: "Price",
    },
    {
      id: 3,
      title: "Horsepower *",
      type: "text",
      name: "hp",
      placeholder: "Horsepower",
    },
  ];
</script>
<style lang=""></style>
