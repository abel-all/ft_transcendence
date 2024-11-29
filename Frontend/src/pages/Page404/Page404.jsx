import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import textFile from '../../assets/data/404BaseImage.txt'
import { twMerge } from "tailwind-merge";


function Page404() {
    const [readText, setreadText] = useState("");
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();
    const Canv = useRef(10);


    const timer = setInterval(() => {
        if (Canv.current <= 0) {
            clearInterval(timer);
            navigate("/");
        }else {
            Canv.current--;
        }
    }, 1000);
    

    if (fetched) {

        const SetImage = new Image();
        SetImage.src = `data:image/jpeg;base64,${readText}`;
        const canvas = document.getElementById('canva');
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 1800;

        
        
        let particalArray = [];
        const numberOfPartocals = 5000;
        
        
        
        class Particals {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.speed = 0;
                this.velocity = Math.random() * 12.5;
                this.size = Math.random();
            }
            update() {
                this.y += this.velocity;
                if (this.y >= canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < numberOfPartocals; i++) {
                particalArray.push(new Particals);
            }
        }

        init();
        
        function animate() {
            let h = 0;
            let w = 0;
    
            while (h < canvas.width) {
                while (w < canvas.height) {
                    ctx.drawImage(SetImage, h, w, 120, 120);
                    w += 120;
                }
                h += 120;
                w = 0;
            }
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0,0,canvas.width, canvas.height);

            for (let i = 0; i < particalArray.length; i++) {
                particalArray[i].update();
                particalArray[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();



























    }

    !fetched && fetch(textFile).then(res => res.text()).then(res => {setreadText(prevState => res); setFetched(prevState => true)});
    return (
        <>
            <div className={twMerge(" h-screen ")}>
                <canvas id="canva" className="absolute w-full h-screen bg-black"/>
                <div className="relative z-2 bg-black bg-opacity-10 h-screen text-[60px] py-[250px] text-center text-white">
                    Got lost ?
                    <div className="flex text-[30px] p-[25px] items-center mt-[200px] justify-center ">
                        <Link className="block center rounded-full bg-white text-black py-[10px] px-[50px]" to="/"> {"Take me home before : 5s"}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
{/* <div ref={Canv} className={twMerge(" h-screen bg-repeat")} style={{ backgroundImage: `url('data:image/jpeg;base64,${readText}')` }}> */}

export default Page404

































/**************
    if (fetched) {

        const SetImage = new Image();
        SetImage.src = "data:image/jpeg;base64,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";
        const canvas = document.getElementById('canva');
        const ctx = canvas.getContext('2d');
        canvas.width = 1200;
        canvas.height = 1800;

        
        
        let particalArray = [];
        const numberOfPartocals = 5000;
        
        
        
        class Particals {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = 0;
                this.speed = 0;
                this.velocity = Math.random() * 12.5;
                this.size = Math.random();
            }
            update() {
                this.y += this.velocity;
                if (this.y >= canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            for (let i = 0; i < numberOfPartocals; i++) {
                particalArray.push(new Particals);
            }
        }

        init();
        
        function animate() {
            let h = 0;
            let w = 0;
    
            while (h < canvas.width) {
                while (w < canvas.height) {
                    ctx.drawImage(SetImage, h, w, 120, 120);
                    w += 120;
                }
                h += 120;
                w = 0;
            }
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0,0,canvas.width, canvas.height);

            for (let i = 0; i < particalArray.length; i++) {
                particalArray[i].update();
                particalArray[i].draw();
            }
            requestAnimationFrame(animate);
        }
        animate();
 * ************/