import toastr from 'toastr';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  onclick: null,
  showDuration: '500',
  hideDuration: '500',
  timeOut: '8500',
  extendedTimeOut: '100000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export function erroMessage(mensagem) {
  toastr.clear();
  toastr.error(mensagem);
}

export function successMessage(mensagem) {
  toastr.clear();
  toastr.success(mensagem);
}

export function alertMessage(mensagem) {
  toastr.clear();
  toastr.warning(mensagem);
}
