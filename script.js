/* =================================
   1. MENU DE NAVIGATION
================================= */

// Sélectionner les éléments HTML
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Ouvrir et fermer le menu
menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

// Fermer le menu après un clic sur un lien
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =================================
   2. ANIMATIONS AU DEFILEMENT
================================= */

// Sélectionner toutes les sections
const sections = document.querySelectorAll("section");

// Ajouter la classe reveal
sections.forEach(function (section) {
    section.classList.add("reveal");
});

// Vérifier si IntersectionObserver existe
if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.15
    });

    // Observer chaque section
    sections.forEach(function (section) {
        observer.observe(section);
    });

} else {

    sections.forEach(function (section) {
        section.classList.add("visible");
    });

}


/* =================================
   3. FORMULAIRE DE CONTACT
================================= */

// Sélectionner le formulaire
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

// Vérifier que les éléments existent
if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Récupérer les valeurs des champs
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();

        // Vérifier les champs
        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Veuillez remplir tous les champs.";
            formMessage.style.color = "red";
            return;
        }

        // Préparer l'envoi
        const formData = new FormData(contactForm);

        try {

            // Envoyer les données à Formspree
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                // Message de succès
                formMessage.textContent =
                    "Merci " + name + " ! Votre message a été envoyé avec succès.";

                formMessage.style.color = "#a855f7";

                // Réinitialiser le formulaire
                contactForm.reset();

            } else {

                // Erreur d'envoi
                formMessage.textContent =
                    "Une erreur est survenue. Veuillez réessayer.";

                formMessage.style.color = "red";

            }

        } catch (error) {

            // Erreur de connexion
            formMessage.textContent =
                "Impossible d'envoyer le message. Vérifiez votre connexion.";

            formMessage.style.color = "red";

            console.error("Erreur :", error);

        }

    });

} else {

    console.error("Formulaire de contact introuvable.");

}