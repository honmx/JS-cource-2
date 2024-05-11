const apiUrl = '';

const apiStorage = {
    save: async function(data) {
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Ошибка сохранения');
            }

        } catch (error) {
            console.error(error);
        }
    },
    load: async function() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Ошибка загрузки');
            }

            return await response.json();

        } catch (error) {
            console.error(error);
            return [];
        }
    }
};

export default apiStorage;
