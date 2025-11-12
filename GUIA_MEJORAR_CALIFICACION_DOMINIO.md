# Guía para Mejorar la Calificación del Dominio

**Dominio:** scan.onboardigital.com  
**Score Actual:** 4/10  
**Fecha:** 2025-01-28

## Estado Actual

- ✅ **DMARC:** Configurado correctamente (verde)
- ❌ **SPF:** No configurado o incorrecto (rojo)
- ❌ **DKIM:** No configurado o incorrecto (rojo)
- ❌ **BIMI:** No configurado o incorrecto (rojo)

## Objetivo: Score 10/10

Para lograr un score perfecto, necesitas configurar correctamente los 4 protocolos de autenticación de email.

---

## 1. Configurar SPF (Sender Policy Framework)

### ¿Qué es SPF?
SPF permite que el dominio especifique qué servidores de correo están autorizados para enviar emails en su nombre.

### Pasos para configurar SPF:

1. **Accede a tu panel de DNS** (donde gestionas los registros DNS de `scan.onboardigital.com`)

2. **Crea o edita el registro TXT** para SPF:
   ```
   Tipo: TXT
   Nombre: @ (o scan.onboardigital.com)
   Valor: v=spf1 include:_spf.google.com include:mailgun.org include:sendgrid.net ~all
   ```

3. **Personaliza según tus proveedores de email:**
   - Si usas **Gmail/Google Workspace**: `include:_spf.google.com`
   - Si usas **Mailgun**: `include:mailgun.org`
   - Si usas **SendGrid**: `include:sendgrid.net`
   - Si usas **Microsoft 365**: `include:spf.protection.outlook.com`
   - Si tienes servidores propios: `ip4:TU.IP.AQUI`

4. **Ejemplo completo para múltiples proveedores:**
   ```
   v=spf1 include:_spf.google.com include:mailgun.org ip4:192.168.1.1 ~all
   ```

5. **Verifica después de 24-48 horas** que el registro se propague correctamente.

---

## 2. Configurar DKIM (DomainKeys Identified Mail)

### ¿Qué es DKIM?
DKIM añade una firma digital a los emails para verificar que no han sido modificados en tránsito.

### Pasos para configurar DKIM:

#### Opción A: Si usas Google Workspace

1. **Accede a Google Admin Console**
   - Ve a: https://admin.google.com
   - Apps > Google Workspace > Gmail
   - Autenticación de correo

2. **Genera el selector DKIM**
   - Selecciona tu dominio
   - Clic en "Generar nuevo registro"
   - Copia el registro TXT que te proporciona

3. **Agrega el registro TXT en tu DNS:**
   ```
   Tipo: TXT
   Nombre: [selector]._domainkey (ejemplo: google._domainkey)
   Valor: [el valor largo que te da Google]
   ```

#### Opción B: Si usas otro proveedor (Mailgun, SendGrid, etc.)

1. **Accede al panel de tu proveedor de email**
2. **Busca la sección de DKIM**
3. **Copia los registros TXT** que te proporcionan
4. **Agrega los registros en tu DNS:**
   ```
   Tipo: TXT
   Nombre: [el nombre que te da el proveedor]
   Valor: [el valor que te da el proveedor]
   ```

#### Opción C: Si usas Microsoft 365

1. **Accede a Microsoft 365 Admin Center**
2. **Ve a Configuración > Dominios**
3. **Selecciona tu dominio > Configuración de DNS**
4. **Copia los registros DKIM** y agrégalos a tu DNS

---

## 3. Configurar BIMI (Brand Indicators for Message Identification)

### ¿Qué es BIMI?
BIMI permite mostrar el logo de tu marca en los emails de clientes compatibles (Gmail, Yahoo, etc.).

### Pasos para configurar BIMI:

1. **Prepara tu logo:**
   - Formato: SVG (recomendado) o PNG
   - Tamaño: 32x32px o 64x64px
   - Debe ser cuadrado
   - Alojado en HTTPS público

2. **Sube tu logo a un servidor HTTPS:**
   - Ejemplo: `https://www.onboardigital.com/logo.svg`
   - Asegúrate de que sea accesible públicamente

3. **Opcional: Verificación VMC (Verified Mark Certificate)**
   - Para Gmail, necesitas un certificado VMC
   - Puedes usar servicios como: Entrust, DigiCert, o Certificate Authorities que ofrecen VMC

4. **Crea el registro TXT para BIMI:**
   ```
   Tipo: TXT
   Nombre: default._bimi
   Valor: v=BIMI1; l=https://www.onboardigital.com/logo.svg;
   ```

   O con VMC:
   ```
   v=BIMI1; l=https://www.onboardigital.com/logo.svg; a=https://vmc.example.com/cert.pem;
   ```

5. **Agrega el registro en tu DNS**

---

## 4. Verificar DMARC (ya está configurado, pero revisar)

### Asegúrate de que tu DMARC esté optimizado:

```
Tipo: TXT
Nombre: _dmarc
Valor: v=DMARC1; p=quarantine; rua=mailto:dmarc@onboardigital.com; ruf=mailto:dmarc@onboardigital.com; pct=100; aspf=r; adkim=r;
```

**Explicación de parámetros:**
- `p=quarantine`: Emails que fallan van a spam (puedes usar `p=reject` para más estricto)
- `rua`: Email para reportes agregados
- `ruf`: Email para reportes de fallos
- `pct=100`: Aplica a 100% de los emails

---

## Checklist de Verificación

Después de configurar todo, verifica:

- [ ] SPF: Usa herramientas como [MXToolbox SPF Checker](https://mxtoolbox.com/spf.aspx)
- [ ] DKIM: Verifica con [DKIM Validator](https://dkimvalidator.com/)
- [ ] DMARC: Verifica con [DMARC Analyzer](https://dmarcian.com/dmarc-xml-validator/)
- [ ] BIMI: Verifica con [BIMI Inspector](https://bimigroup.org/bimi-inspector/)

---

## Tiempo de Propagación

- **SPF:** 1-24 horas
- **DKIM:** 1-48 horas
- **BIMI:** 1-48 horas
- **DMARC:** 1-24 horas

---

## Herramientas Útiles

1. **EasyDMARC Dashboard:** Tu panel actual donde ves el score
2. **MXToolbox:** Verificación de registros DNS
3. **Google Admin Toolbox:** Verificación de SPF/DKIM
4. **DMARC Analyzer:** Análisis detallado de DMARC

---

## Contacto para Soporte

Si necesitas ayuda con la configuración:
- Revisa la documentación de tu proveedor de email
- Contacta al soporte de tu proveedor de DNS
- Consulta con tu equipo de IT

---

## Notas Importantes

⚠️ **Importante:**
- No elimines registros existentes sin verificar primero
- Haz cambios durante horas de bajo tráfico
- Mantén backups de tus configuraciones actuales
- Algunos proveedores de DNS tienen límites en la longitud de registros TXT

✅ **Mejores Prácticas:**
- Usa `~all` en SPF inicialmente (soft fail), luego cambia a `-all` (hard fail) cuando estés seguro
- Configura DMARC gradualmente: `none` → `quarantine` → `reject`
- Monitorea los reportes DMARC regularmente

---

**Última actualización:** 2025-01-28



