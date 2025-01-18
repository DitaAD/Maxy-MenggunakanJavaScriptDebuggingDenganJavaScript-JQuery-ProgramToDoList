//Dita Annisa Diningtyas | Kelas Front End | Hari 14

$(document).ready(function () {
    //array untuk menyimpan data
    let tasks = []; 

    //debugging; untuk menampilkan pesan saat aplikasi dimulai
    console.log("Aplikasi dimulai, siap menambahkan tugas.");

    //fungsi untuk menampilkan data yang sudah di input
    const displayTasks = () => {
        //hapus elemen taskList setiap kali sebelum menambah input baru
        $('#taskList').empty(); 

        //melakukan perulangan untuk setiap data di dalam array task
        tasks.forEach((task, index) => {
            //menentukan kelas berdasarkan status `completed`
            const $taskItem = $('.task-template').clone().removeClass('d-none task-template');

            //mengisi teks tugas dan nilai input edit dengan data dari array 'tasks'
            $taskItem.find('.task-text').text(task.name);
            $taskItem.find('.edit-task').val(task.name);

            //memperbarui teks tombol selesai berdasarkan status 'completed'
            $taskItem.find('.complete-button').text(task.completed ? 'Belum Selesai' : 'Selesai');

            //menambahkan kelas CSS untuk tugas yang sudah selesai
            $taskItem.find('.task-text').toggleClass('crossed-out', task.completed); 
            $taskItem.addClass(task.completed ? 'list-group-item-success' : '');

            //menambahkan elemen yang baru dibuat ke dalam daftar di halaman HTML
            $('#taskList').append($taskItem);

            //event listener untuk mengubah status tugas dengan tombol Selesai
            $taskItem.find('.complete-button').click(() => {
                tasks[index].completed = !tasks[index].completed;  //toggle status completed
                displayTasks(); 
            });

            //event listener untuk menghapus tugas dari array dengan tombol Hapus
            $taskItem.find('.delete-button').click(() => {
                tasks.splice(index, 1); //menghapus tugas pada index yang sesuai
                displayTasks(); 
            });

            //event listener untuk menampilkan input edit dengan tombol Edit
            $taskItem.find('.edit-button').click(() => {
                $taskItem.find('.task-text').toggleClass('d-none'); //sembunyikan teks asli
                $taskItem.find('.edit-task').toggleClass('d-none').focus(); //menampilkan input edit
            });

            //event listener untuk menyimpan perubahan nama tugas setelah input edit
            $taskItem.find('.edit-task').blur(function () {
                const newTaskName = $(this).val().trim(); //mengambil nilai baru dari input
                if (newTaskName) {
                    tasks[index].name = newTaskName; //mengupdate nama tugas di array
                    displayTasks(); 
                } else {
                    alert('Tugas tidak boleh kosong!');
                }
            });
        });

        //debugging; menampilkan pesan jika daftar tugas kosong
        if (tasks.length === 0) {
            console.warn("Daftar tugas masih kosong");
        }
    };

    //event listener untuk tombol 'Tambah Tugas'
    $('#addTask').click(() => {
        const taskInput = $('#taskInput').val().trim(); //mengambil nilai input dan hilangi spasi 
        if (taskInput) {
            tasks.push({ name: taskInput, completed: false }); //menambahkan input baru ke array
            displayTasks(); 
            $('#taskInput').val(''); //mengkosongkan input setelah tugas ditambahkan
        } else {
            alert('Tugas tidak boleh kosong!');
        }
    });
});