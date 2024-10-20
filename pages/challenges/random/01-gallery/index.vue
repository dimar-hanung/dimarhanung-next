<template>
  <div class="p-8">
    <div class="flex flex-wrap gap-4 justify-center">
      <t-item
        v-for="(item, i) in items"
        :title="item.title"
        :description="item.description"
        :thumb-url="item.thumbUrl"
        :key="`item-${i}`"
        @click="setSelected(item)"
        :selceted="selected.id == item.id"
      ></t-item>
    </div>

    <div class="p-3 mt-8">
      <div class="font-bold">Terpilih</div>
      <table class="mt-8 w-full border border-collapse">
        <tbody>
          <tr>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Thumbnail</th>
          </tr>
          <tr>
            <td class="border p-2">
              {{ selected.title || "-" }}
            </td>
            <td class="border p-2">{{ selected.description || "-" }}</td>
            <td class="border p-2">{{ selected.thumbUrl || "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import tItem from "./components/t-item.vue";

export default {
  components: {
    tItem,
  },

  data() {
    return {
      selected: {},
      items: [
        {
          id: 1,
          title: "Judul 1",
          description: "Deskripsi Item 1",
          thumbUrl:
            "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/e51f5ad207d4e825a6aa705fb17a573a?_a=AQAEuiZ",
        },
        {
          id: 2,
          title: "Judul 2",
          description: "Deskripsi Item 2",
          thumbUrl:
            "https://res.cloudinary.com/daily-now/image/upload/s--8p-D2SXB--/f_auto/v1724614523/ugc/content_9857f481-bd68-49c0-bac8-9c35499d35d6",
        },
        {
          id: 3,
          title: "Judul 3",
          description: "Deskripsi Item 3",
          thumbUrl:
            "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/647c45926c09f434f34bc03f8e738ea8?_a=AQAEuiZ",
        },
      ],
    };
  },
  methods: {
    setSelected(item) {
      this.selected = item || {};
    },
  },
};
</script>
