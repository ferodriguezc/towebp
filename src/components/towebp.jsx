import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function ToWebp() {
    const [images, setImages] = useState([]);
    const [webpImages, setWebpImages] = useState([]);
    const [quality] = useState(0.8); // Valor por defecto de calidad

    // Manejar selección de imágenes
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        convertToWebp(files);

    };

    // Convertir las imágenes seleccionadas a WebP
    const convertToWebp = (files) => {
        const convertedImages = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Convertir a WebP con la calidad especificada
                    const webpUrl = canvas.toDataURL('image/webp', quality);
                    convertedImages.push({
                        url: webpUrl,
                        name: `${file.name.split('.').slice(0, -1).join('.')}.webp`
                    });

                    // Cuando todas las imágenes se hayan convertido, actualiza el estado
                    if (convertedImages.length === files.length) {
                        setWebpImages(convertedImages);
                    }
                };
            };
        });
    };

    // Función para descargar las imágenes en un archivo ZIP
    const downloadZip = () => {
        const zip = new JSZip();

        // Agregar imágenes convertidas al ZIP
        webpImages.forEach((image) => {
            // Convertir el data URL a Blob
            const blob = dataURLToBlob(image.url);
            zip.file(image.name, blob);
        });

        // Generar el archivo ZIP y descargarlo
        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, 'images.zip');
        });
    };

    // Función para convertir un data URL a Blob
    const dataURLToBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className='p-3'>

            {/* Selector para la calidad de compresión */}

            <div class="custom-container p-5">

                <h1 className=' mt-2 mb-5'>Convierte tus imagenes a WebP</h1>


                <div className="folder mt-5 " >
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>

                <label class="custom-file-upload mb-5">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}

                    />

                    Selecciona tus imagenes
                </label>

                <div >



                    <h2>Imágenes originales</h2>
                    {images.length > 0 && (
                        <div>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Original ${index}`}
                                    width="200"
                                />
                            ))}
                        </div>
                    )}

                    <div>
                        <h2 className=''>Imágenes convertidas a WebP</h2>
                        {webpImages.length > 0 && (
                            <div>
                                {webpImages.map((webpImage, index) => (
                                    <div key={index}>
                                        <img src={webpImage.url} alt={`WebP ${index}`} width="200" />
                                        <a href={webpImage.url} download={webpImage.name}>Descargar WebP</a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Botón para descargar las imágenes en un archivo ZIP */}
                    {webpImages.length > 0 && (
                        <button className=' my-5' onClick={downloadZip}>Descargar todas como ZIP</button>
                    )}
                </div>
            </div>








        </div>


    );
}

export default ToWebp;
