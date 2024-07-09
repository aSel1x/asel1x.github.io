const createExCard = data => {
    let exCardHolder = document.getElementById("exCardHolder");
    if (!exCardHolder) return console.error('exCardHolder element not found');

    data.forEach(({ url, title, description, collaborators }) => {
        let exCard = document.createElement("div");
        exCard.classList.add("ex-card");

        let exContent = document.createElement("div");
        exContent.classList.add("ex-content");

        let exTitle = document.createElement("a");
        exTitle.classList.add("ex-title");
        exTitle.href = url;
        exTitle.innerHTML = `<h5>${title}</h5>`;

        let exDescription = document.createElement("p");
        exDescription.classList.add("ex-description");
        exDescription.textContent = description;

        let exCollaborators = document.createElement("div");
        exCollaborators.classList.add("ex-collaborators");

        let collaboratorsLabel = document.createElement("p");
        collaboratorsLabel.innerHTML = `Collaborators:&nbsp`;

        let collaboratorsList = collaborators.reduce((list, { url, name }, i) => {
            let collaboratorLink = document.createElement("a");
            collaboratorLink.href = url;
            collaboratorLink.textContent = name;
            if (i < collaborators.length - 1) {
                collaboratorLink.textContent += ", ";
            }
            list.appendChild(collaboratorLink)
            return list;
        }, document.createElement("div"));
        collaboratorsList.classList.add("collaborators-list");

        exCollaborators.append(collaboratorsLabel, collaboratorsList);

        exCard.append(exContent, exCollaborators);
        exContent.append(exTitle, exDescription);

        exCardHolder.appendChild(exCard);
    });
};

document.addEventListener('DOMContentLoaded', () =>
    fetch('./experience.json')
        .then(response => response.json())
        .then(createExCard)
        .catch(error => console.error('Error loading data:', error))
);
