import { VctrApi } from "https://www.vectary.com/viewer-api/v1/api.js";
let viewerApi;

async function run() {    

    function errHandler(err) {
        console.log("API error", err);
    }

    function listeners() {
        document.getElementById("load").onclick = async () => {
            var img = new Image();
                img.src = "example-image.jpg";
                img.onload = async () => {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var dataURL = canvas.toDataURL();
                    await viewerApi.updateMaterial("_switchable", { map: dataURL, emissiveMap: dataURL })
                }
        }

        document.getElementById("save").onclick = async () => {
            const screenshot = await viewerApi.takeScreenshot(2);

            var a = document.createElement('a');
            a.href = screenshot;
            a.download = "screenshot.png";
            document.body.appendChild(a);
            a.click();
        }
    }

    async function onReady() {
        console.log("API ready");
        try {
            listeners();        
        } catch (e) {
            errHandler(e);
        }
    }

    viewerApi = new VctrApi("demo", errHandler);

    try {
        await viewerApi.init();        
        onReady();
    } catch (e) {
        errHandler(e);
    }
}

run();