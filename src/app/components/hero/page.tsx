
// import { IoIosAdd } from "react-icons/io";
function Hero(){
    return(
        <div id="hero-container" className="flex bg-gradient-to-r from-purple p-8 rounded-xl justify-between shadow-xl">
            <div id="quote" className="w-3/5">
                <h1 className="text-white text-xl font-bold py-1">Quote of the day</h1>
                <p className="text-white py-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex ad molestias magni dolor inventore libero laborum, enim consectetur doloremque quis minus tempora mollitia reprehenderit error ut velit. Mollitia eos eaque ullam, nemo, facere dignissimos esse temporibus aut quibusdam eveniet magnam repellendus architecto molestias commodi id quaerat voluptate nulla quos molestiae?</p>
                <h2 className="text-white font-light py-1">Author</h2>
            </div>
            <div id="add-task-btn" className="bg-gray py-5 px-10 rounded-lg shadow-lg">
                <p className="text-dark-purple mb-4">New Topic</p>
                <p className="text-8xl"><svg width="81" height="82" viewBox="0 0 511 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M244.208 0.624673C235.011 2.92367 227.821 8.68867 223.431 17.2807L220.974 22.0907V224.527L23.974 225.091L18.428 227.692C10.771 231.284 6.044 235.727 2.777 242.404C0.492 247.075 0 249.408 0 255.591C0 268.514 6.061 277.689 18.428 283.49L23.974 286.091L220.419 286.656L220.696 387.374C220.973 487.852 220.979 488.102 223.111 492.713C229.356 506.219 242.775 513.342 256.839 510.617C267.679 508.517 275.697 501.774 279.615 491.462C281.382 486.812 281.474 481.623 281.474 386.612V286.654L486.974 286.091L492.52 283.49C500.177 279.898 504.904 275.455 508.171 268.778C510.462 264.096 510.946 261.788 510.936 255.597C510.916 243.205 505.111 233.999 493.807 228.434L487.211 225.187L281.474 225.761V126.042C281.474 51.6927 281.17 25.2757 280.279 22.2067C278.823 17.1887 275.479 11.6367 271.755 8.05367C265.412 1.95067 252.66 -1.48833 244.208 0.624673Z" fill="#734A73"/>
                </svg>
                </p>
            </div>
        </div>
    )
}

export default Hero;