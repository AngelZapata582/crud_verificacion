<template>
    <div class="container box">
        <div class="m-2">
            <button type="button" class="button is-primary js-modal-trigger" data-target="modal-js-example">Agregar</button>
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
    <div class="modal" id="modal-add">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form class="box m-auto" style="width:450px;">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Email" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="Password" />
                        </div>
                    </div>
                    <div class="field">
                        <button class="button is-info" type="submit">Enviar</button>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Save changes</button>
                <button class="button">Cancel</button>
            </footer>
        </div>
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

document.addEventListener('DOMContentLoaded', () => {
    const $el = document.getElementById('modal-add')
    // Functions to open and close a modal
    function openModal() {
        $el.classList.add('is-active');
    }

    function closeModal() {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        console.log($target);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});

</script>
