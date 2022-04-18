function makePassword() {
    async function fetchPassword(link) {
        try {
            const response = await fetch(link, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            password.value = result;
        } catch (err) {
            console.log(err);
        }
    }

    const password = document.querySelector('input[type="text"]')
    const rangeValue = document.getElementById('rangevalue').value
    const checkBoxesValues = Array.from(checkboxes).map(checkbox => {
        let value = 0
        if (checkbox.checked) {
            value = Number(checkbox.value)
        }
        return value
    })
    const x = checkBoxesValues.reduce((acc, c) => acc + c)
    const link = `https://random.justyy.workers.dev/api/random/?n=${rangeValue}&x=${x}`
    fetchPassword(link)
}

const inputRange = document.querySelector('input[type="range"]')
inputRange.addEventListener('input', () => {
    const rangeValue = document.getElementById('rangevalue')
    rangeValue.value= inputRange.value
    makePassword()
})

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const checkBoxesValues = [1,2,4,8]
checkboxes.forEach((checkbox, i) => {
    checkbox.value = checkBoxesValues[i]
    checkbox.addEventListener('click', makePassword)
})

const btn = document.querySelector('button')
btn.addEventListener('click', makePassword)

makePassword()