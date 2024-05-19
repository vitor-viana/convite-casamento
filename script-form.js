class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);

        if (this.form) {
            this.url = this.form.getAttribute("Action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        alert("Presença confirmada! Nós te esperamos no dia 10/08.");
    }

    displayError() {
        alert("Erro: Não foi possivel enviar sua confirmação! Tente novamente..");
    }

    getFormObject() {
        const formObject = {};
        const fields  = this.form.querySelectorAll("[name]");
       
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(this.getFormObject())
            });
            this.onSubmission(event);
            this.displaySuccess();

        } catch {
            this.onSubmission(event);
            this.displayError();
            throw new Error(error);
        }
    }

    onSubmission(event) {
        if (event.target.innerText == "Confirmar Presença") {
            event.preventDefault();
            event.target.disabled = true;
            event.target.innerText = "Enviando Confirmação...";
        } else {
            event.target.disabled = false;
            event.target.innerText = "Confirmar Presença";
        }
    }

    init() {
        if (this.form) {
            this.formButton.addEventListener("click", this.sendForm);
        }
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]"
});

formSubmit.init();
