document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("create-form");
    const createInput = document.getElementById("create-input");
    const itemList = document.getElementById("item-list");
    const updateSection = document.getElementById("update-section");
    const updateForm = document.getElementById("update-form");
    const updateInput = document.getElementById("update-input");
    const deleteSection = document.getElementById("delete-section");
    const deleteForm = document.getElementById("delete-form");
    const deleteInput = document.getElementById("delete-input");
    let selectedItem = null;

    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemText = createInput.value;
        if (itemText) {
            const li = document.createElement("li");
            li.textContent = itemText;
            itemList.appendChild(li);
            createInput.value = "";
            showUpdateAndDeleteSections();
        }
    });

    itemList.addEventListener("click", (e) => {
        if (e.target && e.target.nodeName == "LI") {
            selectedItem = e.target;
            updateInput.value = selectedItem.textContent;
            deleteInput.value = selectedItem.textContent;
            showUpdateAndDeleteSections();
        }
    });

    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (selectedItem && updateInput.value) {
            selectedItem.textContent = updateInput.value;
            updateInput.value = "";
            selectedItem = null;
            hideUpdateAndDeleteSections();
        }
    });

    deleteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (selectedItem) {
            itemList.removeChild(selectedItem);
            deleteInput.value = "";
            selectedItem = null;
            hideUpdateAndDeleteSections();
        }
    });

    function showUpdateAndDeleteSections() {
        updateSection.style.display = "block";
        deleteSection.style.display = "block";
    }

    function hideUpdateAndDeleteSections() {
        updateSection.style.display = "none";
        deleteSection.style.display = "none";
    }
});
