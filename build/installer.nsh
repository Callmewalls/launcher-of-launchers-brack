!include "nsDialogs.nsh"

Var ShouldRunBootstrap
Var BootstrapCheckbox

Function BootstrapOptionsPageCreate
  nsDialogs::Create 1018
  Pop $0
  StrCmp $0 error 0 +2
    Abort

  ${NSD_CreateLabel} 0 0 100% 42u "Configura el arranque inicial de Launcher of Launchers.\r\n\r\nSi activas esta opción, se ejecutará auto-login local, escaneo local y sincronización inicial antes de abrir la app."
  Pop $1

  ${NSD_CreateCheckbox} 0 54u 100% 10u "Ejecutar escaneo y sincronización inicial al terminar la instalación"
  Pop $BootstrapCheckbox
  ${NSD_SetState} $BootstrapCheckbox $ShouldRunBootstrap

  nsDialogs::Show
FunctionEnd

Function BootstrapOptionsPageLeave
  ${NSD_GetState} $BootstrapCheckbox $ShouldRunBootstrap
FunctionEnd

!macro customPageAfterChangeDir
  Page custom BootstrapOptionsPageCreate BootstrapOptionsPageLeave
!macroend

!macro customInit
  StrCpy $ShouldRunBootstrap 1
!macroend

!macro customInstall
  StrCmp $ShouldRunBootstrap 1 0 +10
    DetailPrint "Running launcher bootstrap (auto-login + local scan + sync)..."
    ExecWait '"$INSTDIR\\${APP_EXECUTABLE_FILENAME}" --post-install-bootstrap' $0
    IntCmp $0 0 +5
      DetailPrint "Launcher bootstrap failed with exit code $0"
      MessageBox MB_ICONSTOP|MB_OK "No se pudo completar el escaneo/sincronización inicial (exit code: $0).\r\n\r\nLa aplicación no se abrirá automáticamente hasta que este proceso finalice correctamente."
      SetErrors
      Abort
    Goto +2
  DetailPrint "Skipping launcher bootstrap by installer selection."
!macroend
