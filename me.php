<!DOCTYPE html>
<html>
<head>
  <title>Tableta Înmulțirii - Educație digitală cu șanse egale</title>
<?php
$c = $_GET['c']
?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta property="og:title" content="Tableta Inmultirii"/>
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Crează propria tablă desenată. Donează laptopul, tableta sau telefonul vechi pe Tableta Înmulțirii pentru Educație digitală cu șanse egale!" />
  <meta property="og:image" content="https://tableta-inmultirii-public.s3.eu-central-1.amazonaws.com/<?php print($c)?>-url.jpg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="768" />
  <meta property="og:image:height" content="403" />
  <meta property="og:url" content="https://tableta-inmultirii.ro/share/me.php?c=/<?php print($c) ?>" />
</head>
<script>
    window.location.replace("https://tableta-inmultirii.ro/share/me/<?php print($c) ?>");
</script>
<body>
<?php
print($c)
?>
</body>
</html>
