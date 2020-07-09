<?php
/**
 * The template for displaying the footer.
 *
 * @package CTCL\Elections
 * @since 1.0.0
 */

?>
<footer>
	<?php if ( is_front_page() ) { ?>
		<div class="footer-content-wrapper">
			<div>
				<h4 class="section-title"><?php bloginfo( 'title' ); ?></h4>
				<p class="info-item">
					<b><?php echo esc_html( \CTCL\Elections\Office_Details::official() ); ?>,</b>
					<?php echo esc_html( \CTCL\Elections\Office_Details::title() ); ?>
				</p>
				<p class="info-item"><b>Email:</b> <?php \CTCL\Elections\Office_Details::email( true, true ); ?></p>
				<p class="info-item"><b>Phone:</b> <?php echo esc_html( \CTCL\Elections\Office_Details::phone() ); ?></p>
			</div>
		</div>
	<?php } else { ?>
		<div class="abbreviated-footer">
			<h4><?php bloginfo( 'title' ); ?></h4>
			<p>
				<b>Email:</b> <?php \CTCL\Elections\Office_Details::email( true, true ); ?>
				| <b>Phone:</b> <?php echo esc_html( \CTCL\Elections\Office_Details::phone() ); ?>
			</p>
		</div>
	<?php } ?>
</footer>

	<?php wp_footer(); ?>

	</body>
</html>
