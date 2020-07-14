<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
   <xsl:template match = "/">   	
<html>
<body style="background:grey">
<div>
	<h1 align="center" style="text-decoration:underline;margin:90px">BLOGGING PLATFORM</h1>	
	<table align="center" style="border:1px solid black;padding:90px;box-shadow:1px 1px 10px 0.5px black;background:white">
		<tr>
			<th style="width:300px; font-size:2rem;">Help And FAQ</th>
			<th style="width:300px; font-size:2rem;">Users</th>
			<th style="width:300px; font-size:2rem;">Blogging</th>
		</tr>
	<br/><br/>
		<xsl:for-each select="sitemap/data">
		<xsl select="entry1"/>
				<tr>
					
					<td style="padding:20px;font-size:20px;" align="center">
					<a style="color:black">
					<xsl:attribute name="href">
					<xsl:value-of select="entry1/@link"/>
					</xsl:attribute>
					<xsl:apply-templates select="entry1"/></a>
				
					
					</td>
					<td style="padding:20px;font-size:20px;" align="center">
						
						<a style="color:black">
						<xsl:attribute name="href">
					<xsl:value-of select="entry2/@link"/>
					</xsl:attribute>
							<xsl:apply-templates select="entry2"/></a>
					
				</td>
					<td  style="padding:20px;font-size:20px;" align="center">
						<a style="color:black">
						<xsl:attribute name="href">
					<xsl:value-of select="entry3/@link"/>
					</xsl:attribute>
					<xsl:apply-templates select="entry3"/></a>
					
					</td>
					<br/>
					
				</tr>
			</xsl:for-each>
	</table>

</div>
</body>
</html>
</xsl:template>

</xsl:stylesheet>


