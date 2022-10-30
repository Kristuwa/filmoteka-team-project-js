export const paginationRef = document.querySelector('.pagination__list');

export class Pagination {
    constructor(totalPages, page) {
        this.totalPages = totalPages;
        this.page = page;
        // this.ref = paginationRef;

        this.fetch = null;
        

    }
    createMarkup() {
        const totalPages = this.totalPages;
        const page = this.page;
        let markup = '';

        const firstPage = `<li class="num">1</li>`;
        const lastPage = `<li class="num">${totalPages}</li>`;
        const dots = `<li class="dots">...</li>`;
        const btnPrev = `<li class="btn__prev">Prev</li>`;
        const btnNext = `<li class="btn__next">Next</li>`;

        let beforePages = page - 2;
        let afterPages = page + 2;
        
        if (totalPages === 1) {
            return;
        }
        if (page > 1) {
            markup += btnPrev;
        }

        if (totalPages < 10) {
            for (let i = 1; i < 10; i++) {
                markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
            }
        }
        if (totalPages >= 10 && page < 6) {
            for (let i = 1; i < 8; i++) {
                markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
            }
        }
        if (page === totalPages) {
            markup += firstPage + dots;
            for (let i = totalPages-6; i <= totalPages; i++) {
                markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
            }
        }
        if (page > totalPages-5 && page < totalPages) {
            markup += firstPage + dots;
            for (let i = totalPages-6; i < totalPages; i++) {
                markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
            }
        }

        if (page >= 6 && page <= totalPages - 5) {
            markup += firstPage + dots;
            for (let i = beforePages; i <= afterPages; i++) {
                markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
            }
        }
        
        if (page < totalPages) {
            if (page < totalPages - 4) {
                markup += dots;
            }
            markup += lastPage;
        }

        if (page < totalPages) {
            markup += btnNext;
        }
        return markup;
    }

    renderMarkup() {
        paginationRef.innerHTML = this.createMarkup(); 
    }
    incrementPage() {
        this.page += 1;
    }
    decrementPage() {
        this.page -= 1;
    }

    removeMarkup() {
        paginationRef.innerHTML = '';
    }
    // changePage(e) {
    //     if (e.target.nodeName === 'UL') {
    //         return;
    //     }
    //     if (e.target.className === 'btn__next') {
    //         this.incrementPage();
    //     }
    //     if (e.target.className === 'btn__prev') {
    //         this.decrementPage();
    //     }
    //     if (e.target.className === 'dots') {
    //         return;
    //     }
    //     if (e.target.className === 'num') {
    //         this.page = Number(e.target.textContent);
    //     }

    //     this.renderMarkup(this.ref);
    // }
}

