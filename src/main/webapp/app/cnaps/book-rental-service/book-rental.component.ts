import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRental } from '@/shared/model/rental/rental.model';
import { IBookCatalog } from '@/shared/model/bookCatalog/book-catalog.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BookRentalService from './book-rental.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BookRental extends mixins(AlertMixin) {
  @Inject('bookRentalService') private bookRentalService: () => BookRentalService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public title = '';
  public rentals: IRental[] = [];
  public books: IBookCatalog[] = [];
  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBooks();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBooks();
  }

  public retrieveAllBooks(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.bookRentalService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.books = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  // public prepareRemove(instance: IRental): void {
  //   this.removeId = instance.id;
  //   if (<any>this.$refs.removeEntity) {
  //     (<any>this.$refs.removeEntity).show();
  //   }
  // }
  //
  // public removeRental(): void {
  //   this.bookRentalService()
  //     .delete(this.removeId)
  //     .then(() => {
  //       const message = this.$t('gatewayApp.rentalRental.deleted', { param: this.removeId });
  //       this.alertService().showAlert(message, 'danger');
  //       this.getAlertFromStore();
  //       this.removeId = null;
  //       this.retrieveAllRentals();
  //       this.closeDialog();
  //     });
  // }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllBooks();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
  public search(title: String): void {
    let foundBook: IBookCatalog[] = [];
    this.bookRentalService()
      .findByTitle(title)
      .then(res => {
        foundBook.push(res);
        this.books = foundBook;
      });
  }
}