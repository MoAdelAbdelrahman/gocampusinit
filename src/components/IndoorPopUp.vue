<template>
    <div>
        <div id="indoorPopup" class="indoorPopup">
            <div class="indoorPopup-content">
                <span class="indoorPopup-close" @click="closePopup">&times;</span>
                <div class="card">
                    <div class="card-header">
                        <h3>GoCampus!</h3>
                    </div>
                    <div class="card-body">
                        <div class="custom-form">



                            <div class="form-container">
                                <div
                                    class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <form class="space-y-6" @submit="getIndoorDirections">
                                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Where do you want
                                            to go?</h5>

                                        <div>
                                            <multiselect v-model="value" :options="buildings"></multiselect>
                                        </div>
                                        <div>
                                            <label for="destRoom"
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination
                                                Room</label>
                                            <input type="text" name="dest" id="dest"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="4-52, 4-51, etc" required />
                                        </div>
                                        <button type="submit"
                                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show
                                            me the way!</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="table-container">

                            <ul>
                                <li class='directionLine' v-for="(direction, index) in directions" :key="index">
                                    From <p class='Node'> {{ direction.FirstNode }} </p> go <p class='Node'>
                                        {{ direction.RelativeDirection }} </p> to get to

                                    <p class='Node'> {{ direction.SecondNode }} </p>
                                </li>
                            </ul>
                            <!-- Add more rows as needed -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import {Multiselect} from 'vue-multiselect'



export default {
    name: 'IndoorPopUp',
    mounted() {
        document.getElementsByClassName('table-container')[0].style.display = 'none';
    },
    data() {
        return {

            directions: [],
            value: null,
            AthabascaLocation: [],
            buildings: ['Athabasca Hall', 'CAB', 'CCIS', 'ETLC', 'GSB', 'HUB', 'NREF', 'PCL', 'Rutherford', 'SUB',  'Van Vliet'],

        }
    },
   
    computed: {
        
    },
    components: {
        Multiselect,
    },
    methods: {
        closePopup() {

            
            
           
            this.data = [];
            document.getElementById('dest').value = '';

            
        },


        async getIndoorDirections(event) {
            event.preventDefault();
            let to = ''; // Declare and initialize the 'to' variable

            try {
                to = document.getElementById('dest').value; // Assign the value of 'to'
                const url = `http://192.168.0.40:3000/getPathFromEntry?mUri=${to}`;

                const response = await fetch(url);
                this.AthabascaLocation = [-113.52639120070329, 53.526704019665004];
                this.directions = await response.json();
               

            } catch (error) {
                console.error('Error:', error);
            }

            this.$emit('directions-updated', this.directions);
            this.$emit('AthbascaCoords', this.AthabascaLocation);
            this.$emit('getCurrentLocation', 'current');
            document.getElementById('indoorPopup').style.display = 'none';
        }
    }
}
</script>




<style scoped>


@import url('https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css');


.indoorPopup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    /* Dark overlay */
}

.indoorPopup-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    /* More responsive */
    max-width: 600px;
    /* Ensures it doesn't get too wide on larger screens */
    border-radius: 10px;
    /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Shadow for depth */
    transition: all 0.3s ease-in-out;
    /* Smooth transition for popup */
    display: flex;
    /* Enables flexbox */
    flex-direction: column;
    /* Stack children vertically */
    align-items: center;
    /* Center-align children horizontally */
    justify-content: center;
    /* Center-align children vertically */
}

.card-header,
.card-body {
    background: linear-gradient(145deg, #4CAF50, #FFD700);
    /* UofA Green and Yellowish Gradient */
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    /* Rounded corners for inner card */
    color: white;
    /* Better contrast */
}

.card-header {
    border-bottom: 1px solid #ccc;
}

.form-container,
.table-container {
    margin-bottom: 20px;
}

.form-container {
    background: #e8e8e8;
    /* Light background for form */
    border-radius: 8px;
    /* Rounded corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Subtle shadow */
    transition: all 0.3s ease-in-out;
    /* Smooth transition for form */
}

.table-container table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    /* Rounded corners for table */
    overflow: hidden;
    /* Ensures the rounded corners clip the content */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Shadow for depth */
}

.table-container th,
.table-container td {
    border: 1px solid #9ddb8a;
    /* Soft green borders */
    text-align: left;
    padding: 8px;
    color: black;
}

.table-container th {
    background: linear-gradient(145deg, #4CAF50, #FFD700);
    /* Header with gradient */
    color: rgb(0, 0, 0);
    /* Text color for contrast */
}

.table-container tr:nth-child(odd) {
    background-color: #f0f8ff;
    /* Lighter for rows for better readability */
}

.indoorPopup-close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.indoorPopup-close:hover,
.indoorPopup-close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

@media (max-width: 768px) {
    .indoorPopup-content {
        width: 90%;
        /* More screen width on smaller devices */
        margin: 10% auto;
        /* Adjusted for smaller screens */
    }
}

@media (max-width: 480px) {

    .form-container,
    .table-container {
        padding: 10px;
        /* Adjust padding for smaller screens */
    }
}


/* Other styles remain unchanged */

.form-container .custom-form {
    padding: 20px;
    /* Adjusted padding for more space */
    background-color: #fff;
    /* Light background for the form */
    border: 2px solid #FFD700;
    /* UofA yellowish border */
    border-radius: 10px;
    /* More pronounced rounded corners */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    /* Enhanced shadow for depth */
    transition: all 0.3s ease-in-out;
    /* Smooth transition for interaction */
    margin-top: 20px;
    /* Add some space above the form */
}

/* Adjusting for dark mode preferences */
.dark-mode .custom-form {
    background-color: #2F3E46;
    /* Darker background for dark mode */
    border-color: #4CAF50;
    /* UofA green for the border in dark mode */
    color: #E2E8F0;
    /* Lighter text for better readability in dark mode */
}

/* Enhancements for input and checkbox styles within the form */
.custom-form input[type="text"],
.custom-form input[type="checkbox"] {
    border-color: #4CAF50;
    /* UofA green borders for inputs */
    background-color: #f0f8ff;
    /* Slightly off-white background for inputs */
}

.custom-form input[type="text"]:focus,
.custom-form input[type="checkbox"]:focus {
    border-color: #FFD700;
    /* UofA yellowish for focus */
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5);
    /* Soft glow effect */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .form-container .custom-form {
        padding: 15px;
        /* Slightly less padding on smaller screens */
    }
}

@media (max-width: 480px) {
    .form-container .custom-form {
        padding: 10px;
        /* Reduced padding for very small screens */
    }
}

/* Button Styles */
.custom-form button[type="submit"] {
    background: linear-gradient(145deg, #4CAF50, #FFD700);
    /* Gradient effect */
    color: white;
    /* Text color */
    border: none;
    /* Remove default border */
    padding: 10px 15px;
    /* Padding for better sizing */
    border-radius: 5px;
    /* Rounded corners */
    cursor: pointer;
    /* Cursor to pointer to indicate it's clickable */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* Smooth transition for hover effects */
}

.custom-form button[type="submit"]:hover {
    transform: translateY(-2px);
    /* Slight lift effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Shadow for depth */
}

.Node {
    display: inline;

    color: black;
}

.directionLine {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #9ddb8a;
    border-radius: 8px;
    font-weight: bold;
    background-color: #64bd16;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
}


  


</style>
