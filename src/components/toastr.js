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
  timeOut: '3000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export function erroMessage(mensagem) {
  toastr.error(mensagem);
}

export function successMessage(mensagem) {
  toastr.success(mensagem);
}

export function alertMessage(mensagem) {
  toastr.warning(mensagem);
}
