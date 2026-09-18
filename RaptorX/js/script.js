javascript
/* =========================================
   RAPTOR SLUG INDONESIA
   Main JavaScript
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       WHATSAPP CONFIGURATION
    ========================================= */

    /*
       GANTI NOMOR INI DENGAN NOMOR
       WHATSAPP RAPTOR SLUG.

       Contoh:
       081234567890

       Ditulis menjadi:
       6281234567890
    */

    const whatsappNumber = "6281234567890";



    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const header = document.querySelector("header");


    const updateNavbar = () => {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );



    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach((link) => {


        link.addEventListener(
            "click",
            (event) => {


                const targetId =
                    link.getAttribute("href");


                /*
                   Jangan proses link "#"
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    event.preventDefault();

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });


            }
        );

    });



    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(

            ".section-label, .section-title, .section-description, " +

            ".about-text, .about-highlight, " +

            ".product-card, .gallery-item, .contact-box"

        );


    if (
        "IntersectionObserver"
        in window
    ) {


        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {


                    entries.forEach(
                        (entry) => {


                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }
                    );


                },

                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"

                }

            );


        revealElements.forEach(
            (element) => {


                element.classList.add(
                    "reveal"
                );


                revealObserver.observe(
                    element
                );


            }
        );


    } else {


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );

            }
        );

    }



    /* =========================================
       FOOTER YEAR
    ========================================= */

    const footerText =
        document.querySelector(
            ".footer-copy"
        );


    if (footerText) {


        const currentYear =
            new Date().getFullYear();


        footerText.textContent =

            `© ${currentYear} Raptor Slug Indonesia. All Rights Reserved.`;

    }



    /* =========================================
       PREVENT EMPTY CONTACT BUTTON
    ========================================= */

    const contactButton =
        document.querySelector(
            ".contact-button"
        );


    if (contactButton) {


        contactButton.addEventListener(
            "click",
            (event) => {


                const href =
                    contactButton.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {


                    event.preventDefault();


                    const contactSection =
                        document.querySelector(
                            "#kontak"
                        );


                    if (contactSection) {


                        contactSection.scrollIntoView({

                            behavior: "smooth"

                        });

                    }

                }

            }
        );

    }



    /* =========================================
       PRODUCT DETAIL MODAL
    ========================================= */


    const productModal =
        document.getElementById(
            "productModal"
        );


    const modalProductImage =
        document.getElementById(
            "modalProductImage"
        );


    const modalProductName =
        document.getElementById(
            "modalProductName"
        );


    const modalProductDescription =
        document.getElementById(
            "modalProductDescription"
        );


    const modalProductPrice =
        document.getElementById(
            "modalProductPrice"
        );


    const modalWhatsApp =
        document.getElementById(
            "modalWhatsApp"
        );



    /*
       Fungsi membuka detail produk
    */

    window.showProduct = (
        name,
        description,
        price,
        image
    ) => {


        if (!productModal) return;


        /*
           Isi informasi produk
        */

        if (modalProductName) {

            modalProductName.textContent =
                name;

        }


        if (modalProductDescription) {

            modalProductDescription.textContent =
                description;

        }


        if (modalProductPrice) {

            modalProductPrice.textContent =
                price;

        }


        if (modalProductImage) {

            modalProductImage.src =
                image;

            modalProductImage.alt =
                name;

        }



        /*
           Buat pesan WhatsApp otomatis
        */

        const whatsappMessage =

            `Halo Raptor Slug Indonesia,

Saya tertarik dengan produk:
${name}

Harga:
${price}

Mohon informasi mengenai ketersediaan dan detail produk.`;


        const whatsappURL =

            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        if (modalWhatsApp) {

            modalWhatsApp.href =
                whatsappURL;

        }



        /*
           Tampilkan modal
        */

        productModal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );


    };



    /* =========================================
       CLOSE PRODUCT MODAL
    ========================================= */


    window.closeProduct = () => {


        if (!productModal) return;


        productModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "modal-open"
        );


    };



    /* =========================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ========================================= */

    if (productModal) {


        productModal.addEventListener(
            "click",
            (event) => {


                if (
                    event.target ===
                    productModal
                ) {

                    window.closeProduct();

                }

            }
        );

    }



    /* =========================================
       ESC KEY TO CLOSE MODAL
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {


            if (
                event.key === "Escape"
            ) {

                window.closeProduct();

            }

        }
    );



    /* =========================================
       PRODUCT WHATSAPP BUTTON
    ========================================= */

    const productWhatsAppButtons =
        document.querySelectorAll(
            ".product-wa"
        );


    productWhatsAppButtons.forEach(
        (button) => {


            button.addEventListener(
                "click",
                () => {

                    /*
                       WhatsApp sudah memiliki
                       link dari HTML.

                       JavaScript tidak mengubah
                       link tersebut.
                    */

                }
            );

        }
    );



    /* =========================================
       GALLERY IMAGE CLICK
    ========================================= */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    galleryImages.forEach(
        (image) => {


            image.addEventListener(
                "click",
                () => {


                    /*
                       Tambahkan efek cursor
                    */

                    image.style.cursor =
                        "zoom-in";


                }
            );

        }
    );


});
