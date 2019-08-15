 
 / / = = = = = = = = = = = = =  
 / / D E P E N D A N C I E S  
 / / = = = = = = = = = = = = =  
 c o n s t   m o n g o o s e   =   r e q u i r e ( ' m o n g o o s e ' ) ;  
 c o n s t   e x p r e s s   =   r e q u i r e ( ' e x p r e s s ' ) ;  
 c o n s t   a p p   =   e x p r e s s ( ) ;  
 c o n s t   p o r t   =   3 0 0 0 ;  
 c o n s t   s e s s i o n s   =   r e q u i r e ( ' e x p r e s s - s e s s i o n ' ) ;  
 c o n s t   d b   =   m o n g o o s e . c o n n e c t i o n ;  
 r e q u i r e ( ' d o t e n v ' ) . c o n f i g ( ) ;  
  
 c o n s t   P O R T   =   p r o c e s s . e n v . P O R T   | |   p o r t ;  
  
 / / d a t a b a s e   v a r i a b l e   f o r   h e r o k u   c o n n e c t i o n  
 c o n s t   P R O J E C T 3 _ D B   =   p r o c e s s . e n v . P R O J E C T 3 _ D B ;  
 / / = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 / / M I D D L E W A R E  
 / / = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 a p p . u s e ( e x p r e s s . j s o n ( ) ) ;  
 a p p . u s e ( e x p r e s s . s t a t i c ( ' p u b l i c ' ) ) ;  
 a p p . u s e ( s e s s i o n s ( {  
     s e c r e t :   p r o c e s s . e n v . S E C R E T ,  
     r e s a v e :   f a l s e ,  
     s a v e U n i n i t i a l i z e d :   f a l s e  
 } ) ) ;  
  
 / / = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 / / C O N T R O L L E R S  
 / / = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 c o n s t   u s e r C o n t r o l l e r   =   r e q u i r e ( ' . / c o n t r o l l e r s / u s e r s . j s ' ) ;  
 a p p . u s e ( ' / u s e r s ' ,   u s e r C o n t r o l l e r ) ;  
 c o n s t   s e s s i o n s C o n t r o l l e r   =   r e q u i r e ( ' . / c o n t r o l l e r s / s e s s i o n s . j s ' ) ;  
 a p p . u s e ( ' / s e s s i o n s ' ,   s e s s i o n s C o n t r o l l e r ) ;  
 c o n s t   d i s q o v e r C o n t r o l l e r   =   r e q u i r e ( ' . / c o n t r o l l e r s / d i s q o v e r . j s ' ) ;  
 a p p . u s e ( ' / d i s q o v e r ' ,   d i s q o v e r C o n t r o l l e r ) ;  
 / /   M A I N   S E R V E R   R O U T E   F O R   U S E R   L O G I N   S E S S I O N  
 a p p . g e t ( ' / d i s q o v e r ' ,   ( r e q ,   r e s )   = >   {  
     i f ( r e q . s e s s i o n . c u r r e n t U s e r ) {  
         r e s . j s o n ( r e q . s e s s i o n . c u r r e n t U s e r ) ;  
     }   e l s e   {  
         r e s . s t a t u s ( 4 0 1 ) . j s o n ( {  
             s t a t u s :   4 0 1 ,  
             m e s s a g e :   " N o t   L o g g e d   I n "  
         } ) ;  
     }  
 } ) ;  
  
 / / C o n n e c t   t o   M o n g o D B  
 m o n g o o s e . c o n n e c t ( P R O J E C T 3 _ D B ,   { u s e N e w U r l P a r s e r :   t r u e } ) ;  
  
 / / E r r o r   /   S u c c e s s  
 d b . o n ( ' e r r o r ' ,   ( e r r o r )   = >   {  
     c o n s o l e . l o g ( e r r o r . m e s s a g e   +   '   i s   M o n g o d   n o t   r u n n i n g ? ' ) ;  
 } )  
 d b . o n ( ' c o n n e c t e d ' ,   ( )   = >   {  
     c o n s o l e . l o g ( ' M o n g o   C o n n e c t e d :   ' ,   P R O J E C T 3 _ D B ) ;  
 } ) ;  
 d b . o n ( ' d i s c o n n e c t e d ' ,   ( )   = >   {  
     c o n s o l e . l o g ( ' M o n g o   D i s c o n n e c t e d ' ) ;  
 } )  
  
 / / C O N N E C T   T O   M O N G O D   L O C A L L Y  
 m o n g o o s e . c o n n e c t i o n . o n c e ( ' o p e n ' ,   ( )   = >   {  
     c o n s o l e . l o g ( ' C o n n e c t e d   t o   M o n g o o s e ' ) ;  
 } )  
 / / A P P   L I S T E N E R  
 a p p . l i s t e n ( p o r t ,   ( )   = >   {  
     c o n s o l e . l o g ( ' L i s t e n i n g . . . ' ) ;  
 } )  
 