export function validate(email, password, checked = true) {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    newErrors.email = "El email es obligatorio";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "El email no es válido";
  }

  if (!password) {
    newErrors.password = "La contraseña es obligatoria";
  } else if (password.length < 7) {
    newErrors.password = "La contraseña debe tener al menos 7 caracteres";
  }

  if (!checked) {
    newErrors.checked = "Debes aceptar la política de privacidad";
  }

  return newErrors;
}
