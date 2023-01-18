<template>
  <div class="container pb-2 pt-2 mx-auto px-3 lg:px-28">
    <div class="mb-8">
      <h1 class="text-2xl md:text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow shadow-white rounded p-1 pt-4 mt-5 flex flex-col">
      <div class="flex flex-col sm:flex-row">
        <CarAddSelect
          title="Make *"
          :options="makes"
          name="make"
          @selectChange="onChange" />
        <CarAddSelect
          title="Model *"
          :options="makes"
          name="model"
          @selectChange="onChange" />
        <CarAddSelect
          title="Year *"
          :options="makes"
          name="year"
          @selectChange="onChange" />
      </div>
      <div class="flex flex-col sm:flex-row">
        <CarAddSelect
          title="Engine *"
          :options="makes"
          name="engine"
          @selectChange="onChange" />
        <CarAddSelect
          title="Gearbox *"
          :options="makes"
          name="gearbox"
          @selectChange="onChange" />

        <CarAddSelect
          title="Color"
          :options="makes"
          name="color"
          @selectChange="onChange" />
      </div>
      <div class="flex flex-col sm:flex-row">
        <CarAddInput
          v-for="input in inputs"
          :key="input.id"
          :title="input.title"
          :name="input.name"
          :placeholder="input.placeholder"
          @inputChange="onChange" />
      </div>

      <CarAddImage @imageChange="onChange" />

      <div class="flex">
        <CarAddTextarea
          title="Description"
          name="description"
          placeholder="Describe your car in a few words..."
          @inputChange="onChange" />
      </div>
      <div class="flex w-full px-2 pb-2 sm:px-4 sm:mx-1">
        <div
          class="flex-1 border border-border-color rounded-lg rounded-tr-none rounded-br-none">
          <div class="flex flex-col">
            <p class="flex items-center justify-center text-base pt-1 mb-3">
              Safety
            </p>
            <SearchBigAdvancedParametersCheckbox
              v-for="n in 12"
              :extraName="n + 's'" />

            <p
              class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
              Exterior
            </p>
            <SearchBigAdvancedParametersCheckbox
              v-for="n in 11"
              :extraName="n + 'e'" />

            <p
              class="flex items-center justify-center text-base pt-1 mb-3 border-t border-border-color">
              Other
            </p>
            <SearchBigAdvancedParametersCheckbox
              v-for="n in 7"
              :extraName="n + 'o'" />
          </div>
        </div>

        <div
          class="flex-1 border border-border-color rounded-lg rounded-tl-none rounded-bl-none">
          <div class="flex flex-col">
            <p class="flex items-center justify-center pt-1 mb-3">Comfort</p>
            <SearchBigAdvancedParametersCheckbox
              v-for="n in 26"
              :extraName="n + 'c'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const { makes } = useCars();
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
      features: "",
      color: "",
      description: "",
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
      name: "mileage",
      placeholder: "Mileage",
    },
    {
      id: 2,
      title: "Price *",
      name: "price",
      placeholder: "Price",
    },
    {
      id: 3,
      title: "Horsepower *",
      name: "hp",
      placeholder: "Horsepower",
    },
  ];
</script>
<style lang=""></style>
