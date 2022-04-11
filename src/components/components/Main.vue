<template>
    <div class="container box">
        <div class="m-2">
            <button type="button" class="button is-primary">Agregar</button>
        </div>
        <table class="table mx-auto">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date</th>
                    <th>Gender</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in data" :key="d">
                    <td>{{ d.id }}</td>
                    <td>{{ d.first_name }}</td>
                    <td>{{ d.last_name }}</td>
                    <td>{{ d.date }}</td>
                    <td>{{ d.gender }}</td>
                    <td>
                        <div class="buttons has-addons">
                            <button type="button" class="button is-warning">Editar</button>
                            <button type="button" class="button is-danger">Eliminar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    id: 1,
                    first_name: "Jesse",
                    last_name: "Simmons",
                    date: "2016-10-15 13:43:27",
                    gender: "Male",
                },
                {
                    id: 2,
                    first_name: "John",
                    last_name: "Jacobs",
                    date: "2016-12-15 06:00:53",
                    gender: "Male",
                },
                {
                    id: 3,
                    first_name: "Tina",
                    last_name: "Gilbert",
                    date: "2016-04-26 06:26:28",
                    gender: "Female",
                },
                {
                    id: 4,
                    first_name: "Clarence",
                    last_name: "Flores",
                    date: "2016-04-10 10:28:46",
                    gender: "Male",
                },
                {
                    id: 5,
                    first_name: "Anne",
                    last_name: "Lee",
                    date: "2016-12-06 14:38:38",
                    gender: "Female",
                },
            ],
        };
    },
};
</script>
